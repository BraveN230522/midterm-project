"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const lodash_1 = __importDefault(require("lodash"));
const db_1 = require("../../../db");
const common_1 = require("../../../utilities/common");
class ProjectControllerClass {
    getProjects(req, res, next) {
        const projectsMapping = db_1.PROJECTS.map((project) => {
            return {
                name: project.name,
                totalTask: project.tasks.length,
                process: 0,
            };
        });
        if (db_1.PROJECTS && db_1.PROJECTS.length > 0) {
            res.status(200);
            res.json((0, common_1.dataMappingSuccess)(projectsMapping));
        }
        else {
            res.status(404);
            res.json((0, common_1.dataMapping)({ message: 'No projects' }));
        }
    }
    getProjectDetails(req, res, next) {
        const projectInviteId = req.params.id;
        console.log({ projectInviteId });
        const data = db_1.PROJECTS.find((project) => project.id === projectInviteId);
        if (!lodash_1.default.isEmpty(data)) {
            res.status(200);
            res.json((0, common_1.dataMappingSuccess)(data));
        }
        else {
            res.status(404);
            res.json((0, common_1.dataMapping)({ message: 'Project is not found' }));
        }
    }
}
exports.ProjectController = new ProjectControllerClass();
