"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("./../../utilities/common");
const db_1 = require("../../db");
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = __importDefault(require("lodash"));
class AdminControllerClass {
    login(req, res, next) {
        const { username, password } = req.body;
        const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_KEY || '1');
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (username === db_1.ADMIN_LOGIN.username && password === db_1.ADMIN_LOGIN.password) {
            //Update valid token to prevent users login same account
            db_1.tokenAdmin.splice(-1);
            db_1.tokenAdmin.push(token);
            res.status(200);
            db_1.ADMIN_INFO.token = 'Bearer ' + token;
            res.json(db_1.ADMIN_INFO);
        }
        else {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
        }
    }
    getUsers(req, res, next) {
        const usersMapping = db_1.USERS.map((user) => {
            return {
                inviteId: user.inviteId,
                name: user.name,
                email: user.email,
            };
        });
        if (db_1.USERS && db_1.USERS.length > 0) {
            res.status(200);
            res.json((0, common_1.dataMappingSuccess)(usersMapping));
        }
        else {
            res.status(404);
            res.json((0, common_1.dataMapping)({ message: 'No users' }));
        }
    }
    getUserDetails(req, res, next) {
        const userInviteId = req.params.id;
        const data = db_1.USERS.find((user) => user.inviteId === userInviteId);
        if (!lodash_1.default.isEmpty(data)) {
            res.status(200);
            res.json((0, common_1.dataMappingSuccess)(data));
        }
        else {
            res.status(404);
            res.json((0, common_1.dataMapping)({ message: 'User is not found' }));
        }
    }
    createUser(req, res, next) {
        const isValidInviteId = db_1.USERS.some((user) => user.inviteId !== req.body.inviteId);
        if (isValidInviteId) {
            res.send('200');
        }
        else {
            res.status(422);
            res.json((0, common_1.dataMapping)({ message: 'Data is invalid' }));
        }
    }
}
exports.AdminController = new AdminControllerClass();
