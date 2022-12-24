"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.adminRouter = router;
const express_validator_1 = require("express-validator");
const constants_1 = require("../constants");
const admin_1 = require("../app/controllers/admin");
// const adminController = require('../app/controllers/AdminController')
//AUTH
router.post(constants_1.noAuthAdminRoutes.login, (0, express_validator_1.body)('username').not().notEmpty().withMessage('Username is a require field'), (0, express_validator_1.body)('password').not().notEmpty().withMessage('Password is a require field'), admin_1.AuthController.login);
//USERS
router.get(constants_1.authAdminRoutes.users, admin_1.UserController.getUsers);
router.get(constants_1.authAdminRoutes.users + '/:id', admin_1.UserController.getUserDetails);
router.post(constants_1.authAdminRoutes.users, admin_1.UserController.createUser);
//PROJECTS
router.get(constants_1.authAdminRoutes.projects, admin_1.ProjectController.getProjects);
router.get(constants_1.authAdminRoutes.projects + '/:id', admin_1.ProjectController.getProjectDetails);
