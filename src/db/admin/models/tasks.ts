import { IUser } from './user'

export interface ITask {
  id: string
  name: string
  status: string
  priority: string
  type: string
  assignee: string
  projectId: string
}
