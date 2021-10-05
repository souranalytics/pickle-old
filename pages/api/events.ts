import { NextApiHandler, NextApiResponse } from 'next'
import connect from 'next-connect'
import { z } from 'zod'

import { apiOptions, getAppByKey, validateData } from '@pickle/lib/api'
import { prisma } from '@pickle/lib/prisma'
import { zodJson } from '@pickle/lib/zod'
import { EventResponse } from '@pickle/types/api'

const schemaPost = z.object({
  data: zodJson,
  meta: zodJson,
  name: z.string(),
  userId: z.string()
})

const handler: NextApiHandler = connect(apiOptions).post(
  async (req, res: NextApiResponse<EventResponse>) => {
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

    res.json({
      event
    })
  }
)

export default handler
