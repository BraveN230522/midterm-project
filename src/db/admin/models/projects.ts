import { ITask } from './tasks'
import { IUser } from './user'

export interface IProject {
  id: string
  name: string
  slug?: string
  startDate?: string
  endDate?: string
  members?: IUser[]
  tasks?: ITask[]
}
