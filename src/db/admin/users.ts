import { getProjectDb } from './projects'
import _ from 'lodash'
import { IUser } from './models'
import { getTaskDb } from './tasks'

export const getUserDb = (): IUser[] => {
  return _.map(USERS, (user) => {
    const PROJECTS = getProjectDb()
    const TASKS = getTaskDb()
    const projects = _.filter(PROJECTS, (project) => {
      const thisUserInProject = _.find(project.members, (member) => member.inviteId === user.inviteId)
      return thisUserInProject !== undefined
    })
    const mappingProjects = _.map(projects, (project) => {
      return _.pick(project, ['id', 'name'])
    })

    const tasks = _.filter(TASKS, (task) => {
      return task.assignee === user.inviteId
    })
    const mappingTasks = _.map(tasks, (task) => {
      return _.pick(task, ['id', 'name'])
    })
    return {
      inviteId: user.inviteId,
      name: user.name,
      email: user.email,
      dob: user.dob,
      projects: mappingProjects,
      tasks: mappingTasks,
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
        startDate: '10/10/2022',
        endDate: '10/10/2023',
      },
    ],
    status: 'active',
    token: 'jwt',
  },
]
