import { Key } from '@prisma/client'
import { NextApiHandler, NextApiResponse } from 'next'
import connect from 'next-connect'
import { z } from 'zod'

import { apiOptions, getApp, getUser, validateData } from '@pickle/lib/api'
import { prisma } from '@pickle/lib/prisma'
import { KeyResponse, KeysResponse } from '@pickle/types/api'

const schemaGet = z.object({
  slug: z.string()
})

const schemaPost = z.object({
  name: z.string(),
  slug: z.string()
})

const handler: NextApiHandler = connect(apiOptions)
  .get(async (req, res: NextApiResponse<KeysResponse>) => {
    const user = await getUser(req)

    const { slug } = validateData(schemaGet, req.query)

    const app = await getApp(user, slug)

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
      // TODO: probably rename this?
      keys: keys as unknown as Array<Key>
    })
  })
  .post(async (req, res: NextApiResponse<KeyResponse>) => {
    const user = await getUser(req)

    const { name, slug } = validateData(schemaPost, {
      ...req.query,
      ...req.body
    })

    const app = await getApp(user, slug, 'owner')

    const key = await prisma.key.create({
      data: {
        app: {
          connect: {
            id: app.id
          }
        },
        name
      }
    })

    res.json({
      // TODO: probably rename this?
      key: key as unknown as Key
    })
  })

export default handler
