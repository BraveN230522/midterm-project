import { Jwt } from 'jsonwebtoken'
import { Express, Request, Response, NextFunction } from 'express'
import { adminRouter } from './admin'
import { adminRoute, noAuthAdminRoutes } from '../configs'
import { expressjwt } from 'express-jwt'
import { tokenAdmin } from '../db'
import { noAuthRoutesToArr } from '../utilities'

export function route(app: Express) {
  app.use(
    expressjwt({
      secret: process.env.JWT_KEY || '1',
      algorithms: ['HS256'],
      getToken: (req: Request): string | Promise<string> | undefined => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          if (process.env.ENV === 'PROD') {
            if (req.headers.authorization.split(' ')[1] !== tokenAdmin[0]) return undefined
            else return req.headers.authorization.split(' ')[1]
          }
          if (process.env.ENV === 'DEV') {
            return req.headers.authorization.split(' ')[1]
          }
        }
        return undefined
      },
    }).unless({ path: noAuthRoutesToArr(noAuthAdminRoutes, adminRoute) })
  )

  app.use(adminRoute, adminRouter)

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({ error: 'Not found' })
  })
}
