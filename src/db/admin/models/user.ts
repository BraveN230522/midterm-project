import { IProject } from './projects'
import { ITask } from './tasks'

export interface IUser {
  inviteId: string
  name?: string
  email?: string
  dob?: string
  projects?: IProject[]
  tasks?: ITask[]
  status?: string
  token?: string
}
