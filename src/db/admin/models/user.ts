import { IProject } from './projects'

export interface IUser {
  inviteId: string
  name?: string
  email?: string
  dob?: string
  projects?: IProject[]
  status?: string
  token?: string
}
