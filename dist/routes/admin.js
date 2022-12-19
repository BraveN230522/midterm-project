"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.adminRouter = router;
const adminController = require('../app/controllers/AdminController');
router.get('/recycle-bin', adminController.recycleBin);
router.patch('/:id/restore', adminController.restore);
router.get('/create', adminController.create);
router.get('/:slug', adminController.detail);
router.get('/deleted/:slug', adminController.detailDeleted);
router.get('/:id/edit', adminController.edit);
router.post('/store', adminController.store);
router.put('/:id', adminController.update);
router.delete('/:id', adminController.delete);
router.delete('/:id/force', adminController.forceDelete);