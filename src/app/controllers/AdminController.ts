import { generateMissingFieldMsg } from './../../utilities/common'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { ADMIN_INFO, ADMIN_LOGIN, USERS, tokenAdmin } from '../../db'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

class AdminControllerClass {
  login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body
    const token = jwt.sign({ username }, process.env.JWT_KEY || '1')
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    if (username === ADMIN_LOGIN.username && password === ADMIN_LOGIN.password) {
      res.status(200)
      ADMIN_INFO.token = 'Bearer ' + token
      tokenAdmin[0] = token
      res.json(ADMIN_INFO)
    } else {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
    }
  }

  getUsers(req: Request, res: Response, next: NextFunction) {
    res.json(USERS)
  }
}

export const AdminController = new AdminControllerClass()
