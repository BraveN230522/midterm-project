import _ from 'lodash'
import { IProject } from '../models'
import { USERS } from './users'

export const getProjectDb = (): IProject[] => {
  return _.map(PROJECTS, (project) => {
    const members = _.filter(USERS, (user) => {
      const thisProjectInUser = _.find(user.projects, (_project) => _project.id === project.id)
      return thisProjectInUser !== undefined
    })

    const mappingMembers = _.map(members, (member) => {
      return {
        inviteId: member.inviteId,
        name: member.name,
        email: member.email,
        dob: member.dob,
      }
    })
    return {
      id: project.id,
      name: project.name,
      slug: project.slug,
      start_date: project.start_date,
      end_date: project.end_date,
      members: mappingMembers,
      tasks: [],
    }
  })
}

export const PROJECTS: IProject[] = [
  {
    id: '1',
    name: 'Krunk',
    slug: 'krunk',
    start_date: '10/10/2022',
    end_date: '10/10/2023',
    members: [],
    tasks: [],
  },
]
