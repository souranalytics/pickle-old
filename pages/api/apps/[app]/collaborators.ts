import { NextApiHandler, NextApiResponse } from 'next'
import connect from 'next-connect'
import { z } from 'zod'

import { apiOptions, getApp, getUser, validateData } from '@pickle/lib/api'
import { apiError } from '@pickle/lib/error'
import { prisma } from '@pickle/lib/prisma'
import { CollaboratorResponse, CollaboratorsResponse } from '@pickle/types/api'

const schemaGet = z.object({
  app: z.string()
})

const schemaPost = z.object({
  app: z.string(),
  email: z.string().email()
})

const handler: NextApiHandler = connect(apiOptions)
  .get(async (req, res: NextApiResponse<CollaboratorsResponse>) => {
    const user = await getUser(req)

    const data = validateData(schemaGet, req.query)

    const app = await getApp(user, data.app)

    const collaborators = await prisma.collaborator.findMany({
      include: {
        profile: true
      },
      where: {
        app: {
          id: app.id
        }
      }
    })

    res.json({
      collaborators
    })
  })
  .post(async (req, res: NextApiResponse<CollaboratorResponse>) => {
    const user = await getUser(req)

    const data = validateData(schemaPost, {
      ...req.query,
      ...req.body
    })

    const app = await getApp(user, data.app, 'owner')

    const profile = await prisma.profile.findUnique({
      where: {
        email: data.email
      }
    })

    if (!profile) {
      throw apiError(404, 'User not found')
    }

    const collaborator = await prisma.collaborator.create({
      data: {
        app: {
          connect: {
            id: app.id
          }
        },
        profile: {
          connect: {
            id: profile.id
          }
        },
        role: 'member'
      },
      include: {
        profile: true
      }
    })

    res.json({
      collaborator
    })
  })

export default handler
