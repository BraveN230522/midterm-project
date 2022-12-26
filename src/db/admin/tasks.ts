import { PROJECTS, getProjectDb } from './projects'
import { findObjectById } from './../../utilities/common'
import _ from 'lodash'
import { ITask } from './models'
import { getUserDb } from './users'

export const getTaskDb = (): ITask[] => {
  return _.map(TASKS, (task) => {
    return {
      id: task.id,
      name: task.name,
      type: task.type,
      priority: task.priority,
      status: task.status,
      startDate: task.startDate,
      endDate: task.endDate,
      assignee: task.assignee,
      project: task.project,
    }
  })
}

export const TASKS: ITask[] = [
  {
    id: 'TASK_1',
    name: 'task name',
    type: '1',
    priority: '1',
    status: '1',
    startDate: '13/4/2022',
    endDate: '13/6/2022',
    assignee: '1',
    project: '1',
  },
]
