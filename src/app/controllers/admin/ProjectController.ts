import { findObjectById, isJsonString } from './../../../utilities/common'
import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import { PROJECTS, USERS, getProjectDb } from '../../../db'
import { dataMapping, dataMappingSuccess } from '../../../utilities/common'
import slugify from 'slugify'
import { IProject } from '../../../db/admin/models'
import { validationResult } from 'express-validator'

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
      res.status(200).json(dataMappingSuccess(projectsMapping))
    } else {
      res.status(404).json(dataMapping({ message: 'No projects found' }))
    }
  }

  getProjectDetails(req: Request, res: Response, next: NextFunction) {
    const PROJECTS = getProjectDb()
    const projectId = req.params.id
    const data = findObjectById({ arr: PROJECTS, id: projectId })
    if (!_.isEmpty(data)) {
      res.status(200).json(dataMappingSuccess(data))
    } else {
      res.status(404).json(dataMapping({ message: 'Project is not found' }))
    }
  }

  createProject(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0] })
    }

    const slug = slugify(req.body.name, '_')

    const project: IProject = {
      id: String(PROJECTS.length + 1),
      slug,
      ...req.body,
    }

    PROJECTS.push(project)
    res.status(200).json(dataMappingSuccess(project))
  }

  updateProject(req: Request, res: Response, next: NextFunction) {
    const projectId = req.params.id
    const index = _.findIndex(PROJECTS, (project) => project.id === projectId)
    const data = findObjectById({ arr: PROJECTS, id: projectId })
    const slug = slugify(req.body.slug, '_')

    const project: IProject = {
      ...data,
      ...req.body,
      slug,
    }

    const mappingProject = _.omit(project, ['members', 'tasks'])

    PROJECTS.splice(index, 1, project)

    res.status(200)
    res.json(dataMappingSuccess(mappingProject, 'Update project successfully'))
  }

  //TODO: Check this function
  addMember(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0] })
    }

    const PROJECTS = getProjectDb()

    if (isJsonString(req.body.memberIds)) {
      const memberIds: string[] = JSON.parse(req.body.memberIds)
      const project: IProject = findObjectById({ arr: PROJECTS, id: req.params.id })

      _.forEach(memberIds, (memberId) => {
        const member = findObjectById({ arr: USERS, id: String(memberId) })
        const mappingMember = _.pick(member, ['inviteId', 'name', 'email', 'dob'])

        project.members?.push(mappingMember)
      })

      res.status(200).json(dataMappingSuccess(project, 'Add project successfully'))
    } else {
      res.status(400).json(dataMapping({ message: 'memberIds must be an array' }))
    }
  }
}

export const ProjectController = new ProjectControllerClass()
