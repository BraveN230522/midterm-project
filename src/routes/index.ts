import { Express, Request, Response, NextFunction } from 'express'
import { adminRouter } from './admin'

export function route(app: Express) {
  // app.use('/courses', coursesRouter)
  app.use('/admin', adminRouter)

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({ error: 'Not found' })
  })
}
