import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import { getProjectDb, getUserDb, USERS } from '../../../db'
import { dataMapping, dataMappingSuccess, findObjectById } from './../../../utilities/common'

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
      res.status(200)
      res.json(dataMapping({ message: 'No users' }))
    }
  }

  getUserDetails(req: Request, res: Response, next: NextFunction) {
    const userInviteId = req.params.id
    const USERS = getUserDb()
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
    const PROJECTS = getProjectDb()
    const defaultProject = findObjectById({ arr: PROJECTS, id: req.body.defaultProject })
    const user = {
      inviteId: String(Date.now()),
      projects: [defaultProject],
    }
    USERS.push(user)
    res.status(200)
    res.json(user)
  }
}

export const UserController = new UserControllerClass()
