import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import { PROJECTS } from '../../../db'
import { dataMapping, dataMappingSuccess } from '../../../utilities/common'

class ProjectControllerClass {
  getProjects(req: Request, res: Response, next: NextFunction) {
    const projectsMapping = PROJECTS.map((project) => {
      return {
        name: project.name,
        totalTask: project.tasks.length,
        process: 0,
      }
    })
    if (PROJECTS && PROJECTS.length > 0) {
      res.status(200)
      res.json(dataMappingSuccess(projectsMapping))
    } else {
      res.status(404)
      res.json(dataMapping({ message: 'No projects' }))
    }
  }

  getProjectDetails(req: Request, res: Response, next: NextFunction) {
    const projectInviteId = req.params.id
    console.log({ projectInviteId })
    const data = PROJECTS.find((project) => project.id === projectInviteId)

    if (!_.isEmpty(data)) {
      res.status(200)
      res.json(dataMappingSuccess(data))
    } else {
      res.status(404)
      res.json(dataMapping({ message: 'Project is not found' }))
    }
  }

  // createUser(req: Request, res: Response, next: NextFunction) {
  //   const isValidInviteId = USERS.some((user) => user.inviteId !== req.body.inviteId)
  //   if (isValidInviteId) {
  //     res.status(200)
  //   } else {
  //     res.status(422)
  //     res.json(dataMapping({ message: `InviteId ${req.body.inviteId} has been used` }))
  //   }
  // }
}

export const ProjectController = new ProjectControllerClass()
