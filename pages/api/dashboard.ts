import { Prisma } from '@prisma/client'
import { formatISO, subDays } from 'date-fns'
import range from 'lodash/range'
import { NextApiHandler, NextApiResponse } from 'next'
import connect from 'next-connect'
import { z } from 'zod'

import { apiOptions, getUser, validateData } from '@pickle/lib/api'
import { apiError } from '@pickle/lib/error'
import { prisma } from '@pickle/lib/prisma'
import { upstash } from '@pickle/lib/upstash'
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

    const days = range(interval === DashboardInterval.weekly ? 7 : 30)
      .map(index =>
        formatISO(subDays(new Date(), index), {
          representation: 'date'
        })
      )
      .reverse()

    const keys = days.map(day => `${app.id}-${type}-${day}`)

    const data = await upstash.getMultiple<number>(keys)

    const query:
      | Prisma.EventCountArgs
      | Prisma.UserCountArgs
      | Prisma.ViewCountArgs = {
      where: {
        app: {
          id: app.id
        }
      }
    }

    const count = await (type === DashboardType.event
      ? prisma.event.count(query as Prisma.EventCountArgs)
      : type === DashboardType.user
      ? prisma.user.count(query as Prisma.UserCountArgs)
      : prisma.view.count(query as Prisma.ViewCountArgs))

    res.json({
      data: {
        count,
        data: data.map((item, index) => ({
          x: days[index],
          y: item ?? 0
        })),
        id: type
      }
    })
  }
)

export default handler
