import { IUser } from './user'

export interface IProject {
  id: string
  name: string
  slug: string
  start_date: string
  end_date: string
  members?: IUser[]
  tasks?: any[]
}
