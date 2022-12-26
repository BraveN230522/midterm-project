import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import { getProjectDb, getUserDb, PRIORITIES, STATUSES, TASKS, TYPES, USERS } from '../../../db'
import { dataMapping, dataMappingSuccess, findObjectById } from '../../../utilities/common'

class TaskControllerClass {
  getTasks(req: Request, res: Response, next: NextFunction) {
    if (TASKS && TASKS.length > 0) {
      res.status(200)
      const mappingTasks = _.map(TASKS, (task) => {
        return _.pick(task, ['id', 'name'])
      })
      res.json(dataMappingSuccess(mappingTasks))
    } else {
      res.status(200)
      res.json(dataMapping({ message: 'No tasks found' }))
    }
  }

  getTaskDetails(req: Request, res: Response, next: NextFunction) {
    const USERS = getUserDb()
    const PROJECTS = getProjectDb()

    const taskId = req.params.id
    const data = findObjectById({ arr: TASKS, id: taskId })

    if (_.isEmpty(data)) {
      res.status(404)
      res.json(dataMapping({ message: 'Task is not found' }))
    }

    const assignee = _.omit(findObjectById({ arr: USERS, id: data?.assignee }), ['projects', 'token'])
    const project = _.omit(findObjectById({ arr: PROJECTS, id: data?.project }), ['members', 'tasks'])
    const type = findObjectById({ arr: TYPES, id: data.type }).name
    const priority = findObjectById({ arr: PRIORITIES, id: data.type }).name
    const status = findObjectById({ arr: STATUSES, id: data.type }).name

    const taskResponse = {
      ...data,
      assignee,
      project,
      type,
      priority,
      status,
    }

    res.status(200)
    res.json(dataMappingSuccess(taskResponse))
  }

  createTask(req: Request, res: Response, next: NextFunction) {
    // const data = findObjectById({ arr: TASKS, id: taskId })
    const USERS = getUserDb()
    const PROJECTS = getProjectDb()
    const taskId = String(TASKS.length + 1)
    const task = {
      id: 'TASK_' + taskId,
      name: req.body.name,
      type: req.body.type,
      priority: req.body.priority,
      status: req.body.status,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      assignee: req.body.assigneeId,
      project: req.body.projectId,
    }
    TASKS.push(task)

    const assignee = _.omit(findObjectById({ arr: USERS, id: task?.assignee }), ['projects', 'token'])
    const project = _.omit(findObjectById({ arr: PROJECTS, id: task?.project }), ['members', 'tasks'])
    const type = findObjectById({ arr: TYPES, id: task.type }).name
    const priority = findObjectById({ arr: PRIORITIES, id: task.type }).name
    const status = findObjectById({ arr: STATUSES, id: task.type }).name

    const taskResponse = {
      ...task,
      assignee,
      project,
      type,
      priority,
      status,
    }

    if (!_.isEmpty(taskResponse)) {
      res.status(200)
      res.json(dataMappingSuccess(taskResponse))
    } else {
      res.status(404)
      res.json(dataMapping({ message: 'Task is not found' }))
    }
  }
}

export const TaskController = new TaskControllerClass()
