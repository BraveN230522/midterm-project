import express from 'express'
const router = express.Router()

const adminController = require('../app/controllers/AdminController')

router.get('/recycle-bin', adminController.recycleBin)
router.patch('/:id/restore', adminController.restore)
router.get('/create', adminController.create)
router.get('/:slug', adminController.detail)
router.get('/deleted/:slug', adminController.detailDeleted)
router.get('/:id/edit', adminController.edit)
router.post('/store', adminController.store)
router.put('/:id', adminController.update)
router.delete('/:id', adminController.delete)
router.delete('/:id/force', adminController.forceDelete)

export { router as adminRouter }
