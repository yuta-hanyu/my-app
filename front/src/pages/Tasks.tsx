import { Box, Card, Divider, Typography } from '@mui/material'
import { blueGrey, grey } from '@mui/material/colors'
import { AxiosResponse } from 'axios'
import { axiosClient } from 'hooks/AxiosClientProvider'
import { Task, TaskList } from 'interface/Task'
import React, { memo, useEffect, useState } from 'react'

const Tasks = memo(() => {
  const [taskColumns, setTaskList] = useState<TaskList[]>([])
  const [startDragColumnIndex, setDragColumnIndex] = useState<number | null>(null)
  const [startDragTaskIndex, setDragTaskIndex] = useState<number | null>(null)
  const [enteredColumnIndex, setEnteredColumnIndex] = useState<number | null>(null)
  const [shouldStopColumnDrag, setShouldStopColumnDrag] = useState<boolean>(false)

  useEffect(() => {
    axiosClient.get(`/tasks`).then((res: AxiosResponse) => {
      setTaskList(res.data)
    })
  }, [])
  console.log(taskColumns)

  const updateTaskColumns = () => {
    axiosClient.put(`/task-column/sort`, { columns: taskColumns }).then((res: AxiosResponse) => {
      console.log('updateTaskColumns', res)
      setTaskList(res.data)
    })
  }

  const updateTasks = () => {
    console.warn(startDragTaskIndex, startDragColumnIndex)
    if (startDragColumnIndex === null) return
    const startTasks: Task[] = taskColumns[startDragColumnIndex].tasks!

    const param = {
      tasks: startTasks,
    }

    if (startDragColumnIndex !== enteredColumnIndex) {
      param.tasks = [...param.tasks, ...taskColumns[enteredColumnIndex!].tasks!]
    }

    axiosClient.put(`/tasks`, param).then((res: AxiosResponse) => {
      console.log('updateTasks', res)
      // setTaskList(res.data)
    })
  }

  const columnDragStart = (columnIndex: number) => {
    if (startDragTaskIndex) return
    setDragColumnIndex(columnIndex)
  }

  const columnDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    // e.currentTarget.style.backgroundColor = 'blue'
    // console.log('columnDragEnter', e)
  }

  const columnDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    // console.log('columnDragLeave', e)
    // e.currentTarget.style.backgroundColor = 'blue'
  }

  const columnDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    updateTaskColumns()
    setDragColumnIndex(null)
    setDragTaskIndex(null)
    setShouldStopColumnDrag(false)
    // console.log('columnDragEnd', e)
    // e.currentTarget.style.backgroundColor = 'black'
  }

  const taskDragEnd = (e: React.DragEvent<HTMLDivElement>, columnIndex: number) => {
    console.log(3333, e, columnIndex)

    e.stopPropagation()
    updateTasks()
    setDragColumnIndex(null)
    setDragTaskIndex(null)
    setShouldStopColumnDrag(false)
    // console.log('columnDragEnd', e)
    // e.currentTarget.style.backgroundColor = 'black'
  }

  const columnDrop = (enteredColumnIndex: number) => {
    // タスクがカラムにドロップされた場合
    if (startDragTaskIndex !== null) {
      const copiedTaskList = structuredClone(taskColumns)
      if (startDragColumnIndex === null) return

      const copiedStartTasks = [...taskColumns[startDragColumnIndex].tasks!]
      const [startTask] = copiedStartTasks.splice(startDragTaskIndex, 1)

      if (startTask === null) return

      copiedTaskList[startDragColumnIndex].tasks = copiedStartTasks
      updateSort(copiedTaskList[startDragColumnIndex].tasks!)

      if (copiedTaskList[enteredColumnIndex].tasks === null) {
        copiedTaskList[enteredColumnIndex].tasks = [startTask]
      } else {
        copiedTaskList[enteredColumnIndex].tasks?.unshift(startTask)
      }
      updateSort(copiedTaskList[enteredColumnIndex].tasks!)

      setTaskList(copiedTaskList)
      return
    }

    if (enteredColumnIndex === startDragColumnIndex || shouldStopColumnDrag) return
    const copiedTaskList = structuredClone(taskColumns)
    if (startDragColumnIndex === null) return
    const [removedColumn] = copiedTaskList.splice(startDragColumnIndex, 1)
    copiedTaskList.splice(enteredColumnIndex, 0, removedColumn)
    updateSort(copiedTaskList)
    setTaskList(copiedTaskList)
  }

  const taskDragStart = (taskIndex: number) => {
    if (startDragColumnIndex) return
    setShouldStopColumnDrag(true)
    setDragTaskIndex(taskIndex)
  }

  const taskDrop = (enteredTaskIndex: number, enteredColumnIndex: number) => {
    setEnteredColumnIndex(enteredColumnIndex)
    // 同一リスト内移動
    if (enteredColumnIndex === startDragColumnIndex) {
      const copiedStartTasks = [...taskColumns[startDragColumnIndex].tasks!]
      if (startDragTaskIndex === null) return
      const [startTask] = copiedStartTasks.splice(startDragTaskIndex, 1)

      copiedStartTasks.splice(enteredTaskIndex, 0, startTask)

      const copiedTaskList = structuredClone(taskColumns)
      copiedTaskList[enteredColumnIndex].tasks = copiedStartTasks

      updateSort(copiedTaskList[enteredColumnIndex].tasks!)
      setTaskList(copiedTaskList)
      return
    }

    const copiedTaskList = structuredClone(taskColumns)

    if (startDragColumnIndex === null) return

    const copiedStartTasks = [...copiedTaskList[startDragColumnIndex].tasks!]

    if (startDragTaskIndex === null) return
    const [startTask] = copiedStartTasks.splice(startDragTaskIndex, 1)
    copiedTaskList[startDragColumnIndex].tasks = copiedStartTasks
    updateSort(copiedTaskList[startDragColumnIndex].tasks!)

    if (enteredColumnIndex === null) return
    const copiedEndTasks = [...copiedTaskList[enteredColumnIndex].tasks!]
    copiedEndTasks.splice(enteredTaskIndex, 0, startTask)
    copiedTaskList[enteredColumnIndex].tasks = copiedEndTasks
    updateSort(copiedTaskList[enteredColumnIndex].tasks!)

    setTaskList(copiedTaskList)
  }

  const updateSort = (list: TaskList[] | Task[]) => {
    if (!list) return
    list.forEach((value: Task | TaskList, index: number) => {
      if (!value) return
      value.sort = index
    })
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
      {taskColumns.map((column: TaskList, columnIndex: number) => {
        return (
          <Box
            component={'div'}
            key={columnIndex}
            sx={{
              width: '80%',
              background: grey[900],
              color: blueGrey[50],
              cursor: 'pointer',
              opacity: columnIndex === startDragColumnIndex ? '0.5' : '',
              // backgroundColor: columnIndex === startDragColumnIndex ? 'blue' : '',
              borderRadius: '12px 12px 12px 12px',
              p: 1,
              mx: 1,
            }}
            draggable="true"
            onDragStart={() => columnDragStart(columnIndex)}
            onDragOver={(e) => {
              e.preventDefault()
            }}
            onDragEnter={(e) => columnDragEnter(e)}
            onDragLeave={(e) => columnDragLeave(e)}
            onDrop={() => columnDrop(columnIndex)}
            onDragEnd={(e) => columnDragEnd(e)}
          >
            <Typography variant="h6" noWrap component="div" align="center">
              {column.taskColumnId}
              {column.title}
            </Typography>
            <Divider sx={{ background: blueGrey[50] }} />
            {column.tasks?.map((task: Task, taskIndex: number) => {
              return (
                task && (
                  <Box component={'div'} key={taskIndex} py={2} mb={2}>
                    <Card
                      draggable="true"
                      sx={{
                        background: grey[800],
                        color: blueGrey[50],
                        cursor: 'pointer',
                        opacity: column.taskColumnId === startDragTaskIndex ? '0.5' : '',
                        // backgroundColor: column.taskColumnId === startDragTaskIndex ? 'green' : '',
                      }}
                      onDragStart={() => {
                        taskDragStart(taskIndex)
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.stopPropagation(), taskDrop(taskIndex, columnIndex)
                      }}
                      onDragEnd={(e) => taskDragEnd(e, columnIndex)}
                    >
                      <Typography variant="subtitle1" noWrap component="div" m={2}>
                        {task.title} {columnIndex}
                      </Typography>
                    </Card>
                  </Box>
                )
              )
            })}
          </Box>
        )
      })}
    </Box>
  )
})
export default Tasks
