export interface TaskList {
  taskColumnId: number
  userId: number
  sort: number
  title: string
  tasks?: Task[]
}

export interface Task {
  taskId: number
  taskColumnId: number
  userId: number
  sort: number
  title: string
}
