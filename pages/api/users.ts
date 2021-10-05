import { NextApiHandler, NextApiResponse } from 'next'
import connect from 'next-connect'
import { z } from 'zod'

import { apiOptions, getApp, validateData } from '@pickle/lib/api'
import { prisma } from '@pickle/lib/prisma'
import { zodJson } from '@pickle/lib/zod'
import { UserResponse } from '@pickle/types/api'

const schemaPost = z.object({
  anonymousId: z.string(),
  data: zodJson,
  id: z.string(),
  meta: zodJson
})

const handler: NextApiHandler = connect(apiOptions).post(
  async (req, res: NextApiResponse<UserResponse>) => {
    const app = await getApp(req)

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
  }
)

export default handler
