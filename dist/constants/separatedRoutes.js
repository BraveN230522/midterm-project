"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noAuthRoutesToArr = exports.authAdminRoutes = exports.noAuthAdminRoutes = exports.userRoute = exports.adminRoute = void 0;
exports.adminRoute = '/api/admin';
exports.userRoute = '/api/user';
exports.noAuthAdminRoutes = {
    login: '/login',
};
exports.authAdminRoutes = {
    users: '/users',
    projects: '/projects',
};
const noAuthRoutesToArr = (obj, route) => Object.entries(obj).map(([_, value]) => {
    return route + value;
});
exports.noAuthRoutesToArr = noAuthRoutesToArr;
