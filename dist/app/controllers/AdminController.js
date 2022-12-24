"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const db_1 = require("../../db");
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AdminControllerClass {
    login(req, res, next) {
        const { username, password } = req.body;
        const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_KEY || '1');
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (username === db_1.ADMIN_LOGIN.username && password === db_1.ADMIN_LOGIN.password) {
            //Update valid token to prevent login same account
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
        res.json(db_1.USERS);
    }
}
exports.AdminController = new AdminControllerClass();
