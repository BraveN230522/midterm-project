import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import { USERS } from '../../../db'
import { dataMapping, dataMappingSuccess } from './../../../utilities/common'

class UserControllerClass {
  getUsers(req: Request, res: Response, next: NextFunction) {
    const usersMapping = USERS.map((user) => {
      return {
        inviteId: user.inviteId,
        name: user.name,
        email: user.email,
      }
    })
    if (USERS && USERS.length > 0) {
      res.status(200)
      res.json(dataMappingSuccess(usersMapping))
    } else {
      res.status(404)
      res.json(dataMapping({ message: 'No users' }))
    }
  }

  getUserDetails(req: Request, res: Response, next: NextFunction) {
    const userInviteId = req.params.id
    const data = USERS.find((user) => user.inviteId === userInviteId)

    if (!_.isEmpty(data)) {
      res.status(200)
      res.json(dataMappingSuccess(data))
    } else {
      res.status(404)
      res.json(dataMapping({ message: 'User is not found' }))
    }
  }

  createUser(req: Request, res: Response, next: NextFunction) {
    const isValidInviteId = USERS.some((user) => user.inviteId !== req.body.inviteId)
    if (isValidInviteId) {
      res.status(200)
    } else {
      res.status(422)
      res.json(dataMapping({ message: `inviteId ${req.body.inviteId} has been used` }))
    }
  }
}

export const UserController = new UserControllerClass()
