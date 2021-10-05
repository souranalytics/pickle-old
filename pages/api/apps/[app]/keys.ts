import { NextApiHandler, NextApiResponse } from 'next'
import connect from 'next-connect'
import { z } from 'zod'

import { apiOptions, getApp, getUser, validateData } from '@pickle/lib/api'
import { prisma } from '@pickle/lib/prisma'
import { KeyResponse, KeysResponse } from '@pickle/types/api'

const schemaGet = z.object({
  app: z.string()
})

const schemaPost = z.object({
  app: z.string(),
  name: z.string()
})

const handler: NextApiHandler = connect(apiOptions)
  .get(async (req, res: NextApiResponse<KeysResponse>) => {
    const user = await getUser(req)

    const data = validateData(schemaGet, req.query)

    const app = await getApp(user, data.app)

    const keys = await prisma.key.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        app: {
          id: app.id
        }
      }
    })

    res.json({
      keys
    })
  })
  .post(async (req, res: NextApiResponse<KeyResponse>) => {
    const user = await getUser(req)

    const data = validateData(schemaPost, {
      ...req.query,
      ...req.body
    })

    const app = await getApp(user, data.app, 'owner')

    const key = await prisma.key.create({
      data: {
        app: {
          connect: {
            id: app.id
          }
        },
        name: data.name
      }
    })

    res.json({
      key
    })
  })

export default handler
