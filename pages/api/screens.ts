import { NextApiHandler, NextApiResponse } from 'next'
import connect from 'next-connect'
import { z } from 'zod'

import { apiOptions, getApp, validateData } from '@pickle/lib/api'
import { prisma } from '@pickle/lib/prisma'
import { zodJson } from '@pickle/lib/zod'
import { ScreenResponse } from '@pickle/types/api'

const schemaPost = z.object({
  data: zodJson,
  meta: zodJson,
  name: z.string(),
  userId: z.string()
})

const handler: NextApiHandler = connect(apiOptions).post(
  async (req, res: NextApiResponse<ScreenResponse>) => {
    const app = await getApp(req)

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
  }
)

export default handler
