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
import { UserResponse, UsersResponse } from '@pickle/types/api'

const schemaGet = z.object({
  after: z.string().optional(),
  slug: z.string()
})

const schemaPost = z.object({
  anonymousId: z.string(),
  data: zodJson,
  id: z.string(),
  meta: zodJson
})

const handler: NextApiHandler = connect(apiOptions)
  .get(async (req, res: NextApiResponse<UsersResponse>) => {
    const user = await getUser(req)

    const { after, slug } = validateData(schemaGet, req.query)

    const app = await getApp(user, slug)

    const users = await prisma.user.findMany({
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
      users
    })
  })
  .post(async (req, res: NextApiResponse<UserResponse>) => {
    const app = await getAppByKey(req)

    const { anonymousId, data, id, meta } = validateData(schemaPost, req.body)

    const user = await prisma.user.create({
      data: {
        anonymousId,
        app: {
          connect: {
            id: app.id
          }
        },
        data,
        id,
        meta
      }
    })

    res.json({
      user
    })
  })

export default handler
