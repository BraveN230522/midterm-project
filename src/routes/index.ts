import { Express } from 'express'
import { adminRouter } from './admin'

export function route(app: Express) {
  // app.use('/courses', coursesRouter)
  app.use('/admin', adminRouter)
}
