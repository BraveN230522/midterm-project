import { getProjectDb } from './projects'
import _ from 'lodash'
import { IUser } from '../models'

export const getUserDb = (): IUser[] => {
  return _.map(USERS, (user) => {
    const PROJECTS = getProjectDb()
    const projects = _.filter(PROJECTS, (project) => {
      const thisUserInProject = _.find(project.members, (member) => member.inviteId === user.inviteId)
      return thisUserInProject !== undefined
    })
    const mappingProjects = _.map(projects, (project) => {
      return {
        id: project.id,
        name: project.name,
        slug: project.slug,
        start_date: project.start_date,
        end_date: project.end_date,
      }
    })
    return {
      inviteId: user.inviteId,
      name: user.name,
      email: user.email,
      dob: user.dob,
      projects: mappingProjects,
      status: user.status,
      token: user.token,
    }
  })
}

export const USERS: IUser[] = [
  {
    inviteId: '1',
    name: 'dung',
    email: 'dung@gmail.com',
    dob: 'male',
    projects: [
      {
        id: '1',
        name: 'Krunk',
        slug: 'krunk',
        start_date: '10/10/2022',
        end_date: '10/10/2023',
      },
    ],
    status: 'active',
    token: 'jwt',
  },
]
