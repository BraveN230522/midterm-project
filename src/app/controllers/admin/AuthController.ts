import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { ADMIN_INFO, ADMIN_LOGIN, tokenAdmin } from '../../../db'

class AuthControllerClass {
  login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body
    const token = jwt.sign({ username }, process.env.JWT_KEY || '1')
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    if (username === ADMIN_LOGIN.username && password === ADMIN_LOGIN.password) {
      //Update valid token to prevent users login same account
      tokenAdmin.splice(-1)
      tokenAdmin.push(token)

      res.status(200)
      ADMIN_INFO.token = 'Bearer ' + token
      res.json(ADMIN_INFO)
    } else {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
    }
  }
}

export const AuthController = new AuthControllerClass()
