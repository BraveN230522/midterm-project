"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const AdminController_1 = require("../app/controllers/AdminController");
const router = express_1.default.Router();
exports.adminRouter = router;
const express_validator_1 = require("express-validator");
const constants_1 = require("../constants");
// const adminController = require('../app/controllers/AdminController')
router.post(constants_1.noAuthAdminRoutes.login, (0, express_validator_1.body)('username').not().notEmpty().withMessage('Username is a require field'), (0, express_validator_1.body)('password').not().notEmpty().withMessage('Password is a require field'), AdminController_1.AdminController.login);
router.get(constants_1.authAdminRoutes.users, AdminController_1.AdminController.getUsers);
