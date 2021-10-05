import { NextApiHandler, NextApiResponse } from 'next'
import connect from 'next-connect'
import { z } from 'zod'

import { apiOptions, validateData } from '@pickle/lib/api'
import { prisma } from '@pickle/lib/prisma'
import { ProfileResponse } from '@pickle/types/api'

const schemaPost = z.object({
  email: z.string().email(),
  id: z.string().uuid(),
  name: z.string()
})

const handler: NextApiHandler = connect(apiOptions).post(
  async (req, res: NextApiResponse<ProfileResponse>) => {
    const { email, id, name } = validateData(schemaPost, req.body)

    const profile = await prisma.profile.create({
      data: {
        email,
        id,
        name
      }
    })

    res.json({
      profile
    })
  }
)

export default handler
