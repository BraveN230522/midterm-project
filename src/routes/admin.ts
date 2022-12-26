import { findObjectById } from './../utilities/common'
import express from 'express'
const router = express.Router()
import { body, check } from 'express-validator'
import { authAdminRoutes, noAuthAdminRoutes } from '../configs'
import {
  UserController,
  AuthController,
  ProjectController,
  TaskController,
  StatusController,
  TypeController,
  PriorityController,
} from '../app/controllers/admin'
import { STATUSES, TYPES } from '../db'
import _ from 'lodash'

// const adminController = require('../app/controllers/AdminController')

//* AUTH
router.post(
  noAuthAdminRoutes.login,
  check('username', 'Username is a require field').notEmpty(),
  check('password', 'Password is a require field').notEmpty(),
  check('password', 'Password must be at least 3 characters').isLength({ min: 3 }),
  AuthController.login
)

//* USERS
router.get(authAdminRoutes.users, UserController.getUsers)
router.get(authAdminRoutes.users + '/:id', UserController.getUserDetails)
router.post(authAdminRoutes.users, UserController.createUser)

//* PROJECTS
router.get(authAdminRoutes.projects, ProjectController.getProjects)
router.get(authAdminRoutes.projects + '/:id', ProjectController.getProjectDetails)
router.post(authAdminRoutes.projects, ProjectController.createProject)
router.patch(
  authAdminRoutes.projects + '/member' + '/:id',
  check('memberIds', 'MemberIds is a require field').notEmpty(),
  ProjectController.addMember
)
router.patch(authAdminRoutes.projects + '/:id', ProjectController.updateProject)

//* TASKS
router.get(authAdminRoutes.tasks, TaskController.getTasks)
router.get(authAdminRoutes.tasks + '/:id', TaskController.getTaskDetails)
router.post(authAdminRoutes.tasks, TaskController.createTask)

//* STATUSES
router.get(authAdminRoutes.statuses, StatusController.getStatuses)
router.get(authAdminRoutes.statuses + '/:id', StatusController.getStatusDetails)
router.post(
  authAdminRoutes.statuses,
  check('name').custom((value: string, { req }) => {
    const isExisted = _.findIndex(STATUSES, (status) => status.name === value) !== -1
    if (isExisted) throw new Error('This name has been used')

    return true
  }),
  check('order').custom((value: number, { req }) => {
    const isExisted = _.findIndex(STATUSES, (status) => status.order === Number(value)) !== -1
    if (isExisted) throw new Error('This order has been used')

    return true
  }),
  check('order', 'order value must be integer and between 0 to 10').isInt({ min: 0, max: 10 }),
  StatusController.createStatus
)

//* TYPES
router.get(authAdminRoutes.types, TypeController.getTypes)
router.get(authAdminRoutes.types + '/:id', TypeController.getTypeDetails)
router.post(
  authAdminRoutes.types,
  check('name').custom((value: string, { req }) => {
    const isExisted = _.findIndex(TYPES, (status) => status.name === value) !== -1
    if (isExisted) throw new Error('This name has been used')

    return true
  }),
  check('order').custom((value: number, { req }) => {
    const isExisted = _.findIndex(TYPES, (status) => status.order === Number(value)) !== -1
    if (isExisted) throw new Error('This order has been used')

    return true
  }),
  check('order', 'order value must be integer and between 0 to 10').isInt({ min: 0, max: 10 }),
  TypeController.createType
)

//* PRIORITIES
router.get(authAdminRoutes.priorities, PriorityController.getPriorities)
router.get(authAdminRoutes.priorities + '/:id', PriorityController.getPriorityDetails)
router.post(
  authAdminRoutes.priorities,
  check('name').custom((value: string, { req }) => {
    const isExisted = _.findIndex(STATUSES, (status) => status.name === value) !== -1
    if (isExisted) throw new Error('This name has been used')

    return true
  }),
  check('order').custom((value: number, { req }) => {
    const isExisted = _.findIndex(STATUSES, (status) => status.order === Number(value)) !== -1
    if (isExisted) throw new Error('This order has been used')

    return true
  }),
  check('order', 'order value must be integer and between 0 to 10').isInt({ min: 0, max: 10 }),
  PriorityController.createPriority
)

export { router as adminRouter }
