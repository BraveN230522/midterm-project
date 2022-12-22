"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const admin_1 = require("./admin");
const constants_1 = require("../constants");
const express_jwt_1 = require("express-jwt");
let token;
function route(app) {
    // const isRevokedCallback = async (req: Request, token: jwt.Jwt) => {
    //   console.log({ token })
    //   return null
    //   // const issuer = token.payload.iss
    //   // const tokenId = token.payload.jti
    //   // // const tokenTemp = await data.getRevokedToken(issuer, tokenId)
    //   // return token !== 'undefined'
    // }
    app.use((0, express_jwt_1.expressjwt)({
        secret: process.env.JWT_KEY || '1',
        algorithms: ['HS256'],
        getToken: (req) => {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
                return req.headers.authorization.split(' ')[1];
            return undefined;
        },
        // isRevoked: isRevokedCallback,
    }).unless({ path: (0, constants_1.noAuthRoutesToArr)(constants_1.noAuthAdminRoutes, constants_1.adminRoute) }));
    app.use(constants_1.adminRoute, admin_1.adminRouter);
    app.use((req, res, next) => {
        res.status(404).send({ error: 'Not found' });
    });
}
exports.route = route;
