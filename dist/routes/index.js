"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const admin_1 = require("./admin");
function route(app) {
    // app.use('/courses', coursesRouter)
    app.use('/admin', admin_1.adminRouter);
}
exports.route = route;