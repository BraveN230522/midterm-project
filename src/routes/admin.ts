import express from 'express'
const router = express.Router()
import { body } from 'express-validator'
import { authAdminRoutes, noAuthAdminRoutes } from '../constants'
import { UserController, AuthController, ProjectController, TaskController } from '../app/controllers/admin'

// const adminController = require('../app/controllers/AdminController')

//AUTH
router.post(
  noAuthAdminRoutes.login,
  body('username').not().notEmpty().withMessage('Username is a require field'),
  body('password').not().notEmpty().withMessage('Password is a require field'),
  AuthController.login
)

//USERS
router.get(authAdminRoutes.users, UserController.getUsers)
router.get(authAdminRoutes.users + '/:id', UserController.getUserDetails)
router.post(authAdminRoutes.users, UserController.createUser)

//PROJECTS
router.get(authAdminRoutes.projects, ProjectController.getProjects)
router.get(authAdminRoutes.projects + '/:id', ProjectController.getProjectDetails)

//TASKS
router.get(authAdminRoutes.tasks, TaskController.getTasks)
router.get(authAdminRoutes.tasks + '/:id', TaskController.getTaskDetails)

// router.patch('/:id/restore', adminController.restore)
// router.get('/:slug', adminController.detail)
// router.get('/deleted/:slug', adminController.detailDeleted)
// router.get('/:id/edit', adminController.edit)
// router.post('/store', adminController.store)
// router.put('/:id', adminController.update)
// router.delete('/:id', adminController.delete)
// router.delete('/:id/force', adminController.forceDelete)

export { router as adminRouter }
