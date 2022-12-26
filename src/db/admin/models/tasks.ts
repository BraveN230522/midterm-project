import { IProject } from './projects'
import { IUser } from './user'

export interface ITask {
  id: string
  name: string
  status: string
  priority: string
  type: string
  assignee: string
  project: string
  startDate: string
  endDate: string
}
