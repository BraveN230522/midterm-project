import { findObjectById } from './../../../utilities/common'
import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import { getProjectDb } from '../../../db'
import { dataMapping, dataMappingSuccess } from '../../../utilities/common'

class ProjectControllerClass {
  getProjects(req: Request, res: Response, next: NextFunction) {
    const PROJECTS = getProjectDb()
    const projectsMapping = PROJECTS.map((project) => {
      return {
        name: project.name,
        totalTask: project.tasks?.length,
        process: 0,
      }
    })
    if (getProjectDb() && PROJECTS.length > 0) {
      res.status(200)
      res.json(dataMappingSuccess(projectsMapping))
    } else {
      res.status(404)
      res.json(dataMapping({ message: 'No projects found' }))
    }
  }

  getProjectDetails(req: Request, res: Response, next: NextFunction) {
    const PROJECTS = getProjectDb()
    const projectId = req.params.id
    const data = findObjectById({ arr: PROJECTS, id: projectId })
    if (!_.isEmpty(data)) {
      res.status(200)
      res.json(dataMappingSuccess(data))
    } else {
      res.status(404)
      res.json(dataMapping({ message: 'Project is not found' }))
    }
  }
}

export const ProjectController = new ProjectControllerClass()
