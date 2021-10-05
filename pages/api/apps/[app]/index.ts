import { NextApiHandler, NextApiResponse } from 'next'
import connect from 'next-connect'
import { z } from 'zod'

import { apiOptions, getApp, getUser, validateData } from '@pickle/lib/api'
import { prisma } from '@pickle/lib/prisma'
import { AppResponse } from '@pickle/types/api'

const schemaGet = z.object({
  app: z.string()
})

const schemaPut = z.object({
  app: z.string(),
  name: z.string(),
  planId: z.string().optional()
})

const schemaDelete = z.object({
  app: z.string()
})

const handler: NextApiHandler = connect(apiOptions)
  .get(async (req, res: NextApiResponse<AppResponse>) => {
    const user = await getUser(req)

    const data = validateData(schemaGet, req.query)

    const app = await getApp(user, data.app)

    res.json({
      app
    })
  })
  .put(async (req, res: NextApiResponse<AppResponse>) => {
    const user = await getUser(req)

    const data = validateData(schemaPut, {
      ...req.query,
      ...req.body
    })

    const app = await getApp(user, data.app, 'owner')

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

    const app = await getApp(user, data.app, 'owner')

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
