import { NextApiHandler, NextApiResponse } from 'next'
import connect from 'next-connect'
import { z } from 'zod'

import { apiOptions, getUser, validateData } from '@pickle/lib/api'
import { apiError } from '@pickle/lib/error'
import { prisma } from '@pickle/lib/prisma'
import { AppResponse } from '@pickle/types/api'

const schemaGet = z.object({
  app: z.number()
})

const schemaPut = z.object({
  app: z.number(),
  name: z.string(),
  planId: z.string().optional()
})

const schemaDelete = z.object({
  app: z.number()
})

const handler: NextApiHandler = connect(apiOptions)
  .get(async (req, res: NextApiResponse<AppResponse>) => {
    const user = await getUser(req)

    const data = validateData(schemaGet, req.query)

    const app = await prisma.app.findFirst({
      where: {
        collaborators: {
          some: {
            profile: {
              id: user.id
            }
          }
        },
        id: data.app
      }
    })

    if (!app) {
      throw apiError(404, 'App not found')
    }

    res.json({
      app
    })
  })
  .put(async (req, res: NextApiResponse<AppResponse>) => {
    const user = await getUser(req)

    const data = validateData(schemaPut, req.query)

    const app = await prisma.app.findFirst({
      where: {
        collaborators: {
          some: {
            profile: {
              id: user.id
            },
            role: 'owner'
          }
        },
        id: data.app
      }
    })

    if (!app) {
      throw apiError(404, 'App not found')
    }

    if (!data.planId && data.name === app.name) {
      return res.json({
        app
      })
    }

    const next = await prisma.app.update({
      data: {
        name: data.name,
        plan: {
          connect: {
            id: data.planId
          }
        }
      },
      where: {
        id: app.id
      }
    })

    res.json({
      app: next
    })
  })
  .delete(async (req, res: NextApiResponse<AppResponse>) => {
    const user = await getUser(req)

    const data = validateData(schemaDelete, req.query)

    const app = await prisma.app.findFirst({
      where: {
        collaborators: {
          some: {
            profile: {
              id: user.id
            },
            role: 'owner'
          }
        },
        id: data.app
      }
    })

    if (!app) {
      throw apiError(404, 'App not found')
    }

    const next = await prisma.app.delete({
      where: {
        id: app.id
      }
    })

    res.json({
      app: next
    })
  })

export default handler
