import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import { TYPES } from '../../../db'
import { dataMapping, dataMappingSuccess, findObjectById } from '../../../utilities/common'
import { validationResult } from 'express-validator'

class TypeControllerClass {
  getTypes(req: Request, res: Response, next: NextFunction) {
    if (TYPES && TYPES.length > 0) {
      res.status(200)
      res.json(dataMappingSuccess(TYPES))
    } else {
      res.status(200)
      res.json(dataMapping({ message: 'No types found' }))
    }
  }

  getTypeDetails(req: Request, res: Response, next: NextFunction) {
    const statusId = req.params.id
    const data = findObjectById({ arr: TYPES, id: statusId })

    if (!_.isEmpty(data)) {
      res.status(200)
      res.json(dataMappingSuccess(data))
    } else {
      res.status(404)
      res.json(dataMapping({ message: 'Type is not found' }))
    }
  }

  createType(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0] })
    }

    const status = {
      id: String(TYPES.length + 1),
      name: req.body.name,
      order: Number(req.body.order),
    }

    TYPES.push(status)
    res.status(200)
    res.json(dataMappingSuccess(status))
  }
}

export const TypeController = new TypeControllerClass()
