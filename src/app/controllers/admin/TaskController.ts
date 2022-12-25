import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import { getProjectDb, getUserDb, TASKS, USERS } from '../../../db'
import { dataMapping, dataMappingSuccess, findObjectById } from '../../../utilities/common'

class TaskControllerClass {
  getTasks(req: Request, res: Response, next: NextFunction) {
    if (TASKS && TASKS.length > 0) {
      res.status(200)
      res.json(dataMappingSuccess(TASKS))
    } else {
      res.status(200)
      res.json(dataMapping({ message: 'No tasks found' }))
    }
  }

  getTaskDetails(req: Request, res: Response, next: NextFunction) {
    const taskId = req.params.id
    const data = findObjectById({ arr: TASKS, id: taskId })

    if (!_.isEmpty(data)) {
      res.status(200)
      res.json(dataMappingSuccess(data))
    } else {
      res.status(404)
      res.json(dataMapping({ message: 'Task is not found' }))
    }
  }
}

export const TaskController = new TaskControllerClass()
