import express from 'express'
import { AdminController } from '../app/controllers/AdminController'
const router = express.Router()
import { body } from 'express-validator'
var { expressjwt } = require('express-jwt')

// const adminController = require('../app/controllers/AdminController')

router.post(
  '/login',
  body('username').not().notEmpty().withMessage('Username is a require field'),
  body('password').not().notEmpty().withMessage('Password is a require field'),
  AdminController.login
)
router.get(
  '/users',
  expressjwt({ secret: process.env.JWT_KEY || '1', algorithms: ['HS256'] }),
  AdminController.getUsers
)

// router.patch('/:id/restore', adminController.restore)
// router.get('/:slug', adminController.detail)
// router.get('/deleted/:slug', adminController.detailDeleted)
// router.get('/:id/edit', adminController.edit)
// router.post('/store', adminController.store)
// router.put('/:id', adminController.update)
// router.delete('/:id', adminController.delete)
// router.delete('/:id/force', adminController.forceDelete)

export { router as adminRouter }
