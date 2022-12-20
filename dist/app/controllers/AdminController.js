"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const db_1 = require("../../db");
const express_validator_1 = require("express-validator");
class AdminControllerClass {
    login(req, res, next) {
        const { username, password } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (username === db_1.ADMIN_LOGIN.username && password === db_1.ADMIN_LOGIN.password) {
            res.status(200);
            res.json(db_1.ADMIN_INFO);
        }
        else {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
        }
    }
}
exports.AdminController = new AdminControllerClass();
