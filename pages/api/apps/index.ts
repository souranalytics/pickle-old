import { NextApiHandler, NextApiResponse } from 'next'
import connect from 'next-connect'
import { z } from 'zod'

import { apiOptions, getUser, validateData } from '@pickle/lib/api'
import { nanoid } from '@pickle/lib/nanoid'
import { prisma } from '@pickle/lib/prisma'
import { AppResponse, AppsResponse } from '@pickle/types/api'

const schemaPost = z.object({
  name: z.string(),
  planId: z.string()
})

const handler: NextApiHandler = connect(apiOptions)
  .get(async (req, res: NextApiResponse<AppsResponse>) => {
    const user = await getUser(req)

    const apps = await prisma.app.findMany({
      orderBy: {
        createdAt: 'asc'
      },
      where: {
        collaborators: {
          some: {
            profile: {
              id: user.id
            }
          }
        }
      }
    })

    res.json({
      apps
    })
  })
  .post(async (req, res: NextApiResponse<AppResponse>) => {
    const user = await getUser(req)

    const { name, planId } = validateData(schemaPost, req.body)

    const app = await prisma.app.create({
      data: {
        collaborators: {
          create: {
            profile: {
              connect: {
                id: user.id
              }
            },
            role: 'owner'
          }
        },
        keys: {
          create: {
            name: 'Default'
          }
        },
        name,
        plan: {
          connect: {
            id: planId
          }
        },
        slug: nanoid()
      }
    })

    res.json({
      app
    })
  })

export default handler
