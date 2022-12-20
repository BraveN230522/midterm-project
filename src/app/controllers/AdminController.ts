import { generateMissingFieldMsg } from './../../utilities/common'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { ADMIN_INFO, ADMIN_LOGIN } from '../../db'
import { validationResult } from 'express-validator'

class AdminControllerClass {
  login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    if (username === ADMIN_LOGIN.username && password === ADMIN_LOGIN.password) {
      res.status(200)
      res.json(ADMIN_INFO)
    } else {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
    }
  }
}

export const AdminController = new AdminControllerClass()
