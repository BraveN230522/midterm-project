import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import { PRIORITIES } from '../../../db'
import { dataMapping, dataMappingSuccess, findObjectById } from '../../../utilities/common'
import { validationResult } from 'express-validator'

class PriorityControllerClass {
  getPriorities(req: Request, res: Response, next: NextFunction) {
    if (PRIORITIES && PRIORITIES.length > 0) {
      res.status(200)
      res.json(dataMappingSuccess(PRIORITIES))
    } else {
      res.status(200)
      res.json(dataMapping({ message: 'No priorities found' }))
    }
  }

  getPriorityDetails(req: Request, res: Response, next: NextFunction) {
    const statusId = req.params.id
    const data = findObjectById({ arr: PRIORITIES, id: statusId })

    if (!_.isEmpty(data)) {
      res.status(200)
      res.json(dataMappingSuccess(data))
    } else {
      res.status(404)
      res.json(dataMapping({ message: 'Priority is not found' }))
    }
  }

  createPriority(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0] })
    }

    const status = {
      id: String(PRIORITIES.length + 1),
      name: req.body.name,
      order: Number(req.body.order),
    }

    PRIORITIES.push(status)
    res.status(200)
    res.json(dataMappingSuccess(status))
  }
}

export const PriorityController = new PriorityControllerClass()
