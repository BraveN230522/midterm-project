import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import { STATUSES } from '../../../db'
import { dataMapping, dataMappingSuccess, findObjectById } from '../../../utilities/common'
import { validationResult } from 'express-validator'

class StatusControllerClass {
  getStatuses(req: Request, res: Response, next: NextFunction) {
    if (STATUSES && STATUSES.length > 0) {
      res.status(200)
      res.json(dataMappingSuccess(STATUSES))
    } else {
      res.status(200)
      res.json(dataMapping({ message: 'No statuses found' }))
    }
  }

  getStatusDetails(req: Request, res: Response, next: NextFunction) {
    const statusId = req.params.id
    const data = findObjectById({ arr: STATUSES, id: statusId })

    if (!_.isEmpty(data)) {
      res.status(200)
      res.json(dataMappingSuccess(data))
    } else {
      res.status(404)
      res.json(dataMapping({ message: 'Status is not found' }))
    }
  }

  createStatus(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0] })
    }

    const status = {
      id: String(STATUSES.length + 1),
      name: req.body.name,
      order: Number(req.body.order),
    }

    STATUSES.push(status)
    res.status(200)
    res.json(dataMappingSuccess(status))
  }
}

export const StatusController = new StatusControllerClass()
