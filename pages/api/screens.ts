import { NextApiHandler, NextApiResponse } from 'next'
import connect from 'next-connect'
import { z } from 'zod'

import {
  apiOptions,
  getApp,
  getAppByKey,
  getUser,
  validateData
} from '@pickle/lib/api'
import { prisma } from '@pickle/lib/prisma'
import { zodJson } from '@pickle/lib/zod'
import { ScreenResponse, ScreensResponse } from '@pickle/types/api'

const schemaGet = z.object({
  after: z.number().optional(),
  slug: z.string()
})

const schemaPost = z.object({
  data: zodJson,
  meta: zodJson,
  name: z.string(),
  userId: z.string()
})

const handler: NextApiHandler = connect(apiOptions)
  .get(async (req, res: NextApiResponse<ScreensResponse>) => {
    const user = await getUser(req)

    const { after, slug } = validateData(schemaGet, req.query)

    const app = await getApp(user, slug)

    const screens = await prisma.screen.findMany({
      cursor: after
        ? {
            id: after
          }
        : undefined,
      orderBy: {
        createdAt: 'desc'
      },
      skip: after ? 1 : undefined,
      take: 100,
      where: {
        app: {
          id: app.id
        }
      }
    })

    res.json({
      screens
    })
  })
  .post(async (req, res: NextApiResponse<ScreenResponse>) => {
    const app = await getAppByKey(req)

    const { data, meta, name, userId } = validateData(schemaPost, req.body)

    const screen = await prisma.screen.create({
      data: {
        app: {
          connect: {
            id: app.id
          }
        },
        data,
        meta,
        name,
        userId
      }
    })

    res.json({
      screen
    })
  })

export default handler
