import { NextApiHandler, NextApiResponse } from 'next'
import connect from 'next-connect'
import { z } from 'zod'

import { apiOptions, getApp, getUser, validateData } from '@pickle/lib/api'
import { prisma } from '@pickle/lib/prisma'
import { AppResponse } from '@pickle/types/api'

const schemaGet = z.object({
  slug: z.string()
})

const schemaPut = z.object({
  name: z.string(),
  planId: z.string().optional(),
  slug: z.string()
})

const schemaDelete = z.object({
  slug: z.string()
})

const handler: NextApiHandler = connect(apiOptions)
  .get(async (req, res: NextApiResponse<AppResponse>) => {
    const user = await getUser(req)

    const { slug } = validateData(schemaGet, req.query)

    const app = await getApp(user, slug)

    res.json({
      app
    })
  })
  .put(async (req, res: NextApiResponse<AppResponse>) => {
    const user = await getUser(req)

    const { name, planId, slug } = validateData(schemaPut, {
      ...req.query,
      ...req.body
    })

    const app = await getApp(user, slug, 'owner')

    if (!planId && name === app.name) {
      return res.json({
        app
      })
    }

    const next = await prisma.app.update({
      data: {
        name: name,
        plan: {
          connect: {
            id: planId
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

    const { slug } = validateData(schemaDelete, req.query)

    const app = await getApp(user, slug, 'owner')

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
