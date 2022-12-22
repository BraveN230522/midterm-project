// import { jwt } from 'jsonwebtoken'
import { Express, Request, Response, NextFunction } from 'express'
import { adminRouter } from './admin'
import { adminRoute, noAuthAdminRoutes, noAuthRoutesToArr } from '../constants'
import { expressjwt } from 'express-jwt'

let token

export function route(app: Express) {
  // const isRevokedCallback = async (req: Request, token: jwt.Jwt) => {
  //   console.log({ token })
  //   return null
  //   // const issuer = token.payload.iss
  //   // const tokenId = token.payload.jti
  //   // // const tokenTemp = await data.getRevokedToken(issuer, tokenId)
  //   // return token !== 'undefined'
  // }

  app.use(
    expressjwt({
      secret: process.env.JWT_KEY || '1',
      algorithms: ['HS256'],
      getToken: (req: Request): string | Promise<string> | undefined => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
          return req.headers.authorization.split(' ')[1]

        return undefined
      },
      // isRevoked: isRevokedCallback,
    }).unless({ path: noAuthRoutesToArr(noAuthAdminRoutes, adminRoute) })
  )

  app.use(adminRoute, adminRouter)

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({ error: 'Not found' })
  })
}
