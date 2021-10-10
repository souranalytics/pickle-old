import { NextApiHandler, NextApiResponse } from 'next'
import connect from 'next-connect'
import { z } from 'zod'

import { apiOptions, getUser, validateData } from '@pickle/lib/api'
import { apiError } from '@pickle/lib/error'
import { prisma } from '@pickle/lib/prisma'
import { DashboardResponse } from '@pickle/types/api'
import { DashboardInterval, DashboardType } from '@pickle/types/dashboard'

const schema = z.object({
  interval: z.nativeEnum(DashboardInterval),
  slug: z.string(),
  type: z.nativeEnum(DashboardType)
})

const handler: NextApiHandler = connect(apiOptions).get(
  async (req, res: NextApiResponse<DashboardResponse>) => {
    const user = await getUser(req)

    const { interval, slug, type } = validateData(schema, req.query)

    const app = await prisma.app.findFirst({
      where: {
        collaborators: {
          some: {
            profile: {
              id: user.id
            }
          }
        },
        slug
      }
    })

    if (!app) {
      throw apiError(404, 'App not found')
    }

    res.json({
      data: []
    })
  }
)

export default handler
