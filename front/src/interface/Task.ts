export interface TaskList {
  columnId: number
  sort: number
  title: string
  tasks: Task[]
}

export interface Task {
  taskId: number
  sort: number
  title: string
}
