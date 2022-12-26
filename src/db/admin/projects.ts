import _ from 'lodash'
import { IProject } from './models'
import { USERS } from './users'
import { TASKS } from './tasks'

export const getProjectDb = (): IProject[] => {
  return _.map(PROJECTS, (project) => {
    const members = _.filter(USERS, (user) => {
      const thisProjectInUser = _.find(user.projects, (_project) => _project.id === project.id)
      return thisProjectInUser !== undefined
    })

    const tasks = _.filter(TASKS, (task) => {
      return task.project === project.id
    })
    const mappingTask = _.map(tasks, (task) => {
      return _.pick(task, ['id', 'name'])
    })

    const mappingMembers = _.map(members, (member) => {
      return _.pick(member, ['inviteId', 'name', 'email', 'dob'])
    })
    return {
      id: project.id,
      name: project.name,
      slug: project.slug,
      startDate: project.startDate,
      endDate: project.endDate,
      members: mappingMembers,
      tasks: mappingTask,
    }
  })
}

export const PROJECTS: IProject[] = [
  {
    id: '1',
    name: 'Krunk',
    slug: 'krunk',
    startDate: '10/10/2022',
    endDate: '10/10/2023',
    members: [],
    tasks: [],
  },
]
