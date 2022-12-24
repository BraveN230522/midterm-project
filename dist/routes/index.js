"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const admin_1 = require("./admin");
const constants_1 = require("../constants");
const express_jwt_1 = require("express-jwt");
const db_1 = require("../db");
function route(app) {
    app.use((0, express_jwt_1.expressjwt)({
        secret: process.env.JWT_KEY || '1',
        algorithms: ['HS256'],
        getToken: (req) => {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                if (req.headers.authorization.split(' ')[1] !== db_1.tokenAdmin[0])
                    return undefined;
                else
                    return req.headers.authorization.split(' ')[1];
            }
            return undefined;
        },
    }).unless({ path: (0, constants_1.noAuthRoutesToArr)(constants_1.noAuthAdminRoutes, constants_1.adminRoute) }));
    app.use(constants_1.adminRoute, admin_1.adminRouter);
    app.use((req, res, next) => {
        res.status(404).send({ error: 'Not found' });
    });
}
exports.route = route;
