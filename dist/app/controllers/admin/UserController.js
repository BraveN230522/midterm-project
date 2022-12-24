"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const lodash_1 = __importDefault(require("lodash"));
const db_1 = require("../../../db");
const common_1 = require("./../../../utilities/common");
class UserControllerClass {
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
            res.status(200);
        }
        else {
            res.status(422);
            res.json((0, common_1.dataMapping)({ message: `inviteId ${req.body.inviteId} has been used` }));
        }
    }
}
exports.UserController = new UserControllerClass();
