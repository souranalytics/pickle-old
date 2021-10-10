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
import { upstash } from '@pickle/lib/upstash'
import { zodJson } from '@pickle/lib/zod'
import { EventResponse, EventsResponse } from '@pickle/types/api'
import { DashboardType } from '@pickle/types/dashboard'

const schemaGet = z.object({
  after: z
    .string()
    .optional()
    .transform(id => (id ? Number(id) : undefined)),
  slug: z.string()
})

const schemaPost = z.object({
  data: zodJson,
  meta: zodJson,
  name: z.string(),
  userId: z.string()
})

const handler: NextApiHandler = connect(apiOptions)
  .get(async (req, res: NextApiResponse<EventsResponse>) => {
    const user = await getUser(req)

    const { after, slug } = validateData(schemaGet, req.query)

    const app = await getApp(user, slug)

    const events = await prisma.event.findMany({
      cursor:
        after !== undefined
          ? {
              id: after
            }
          : undefined,
      orderBy: {
        createdAt: 'desc'
      },
      skip: after !== undefined ? 1 : undefined,
      take: 100,
      where: {
        app: {
          id: app.id
        }
      }
    })

    res.json({
      events,
      next: events[99]?.id
    })
  })
  .post(async (req, res: NextApiResponse<EventResponse>) => {
    const app = await getAppByKey(req)

    const { data, meta, name, userId } = validateData(schemaPost, req.body)

    const event = await prisma.event.create({
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

    await upstash.increment(app.id, DashboardType.event)

    res.json({
      event
    })
  })

export default handler
