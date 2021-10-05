import { NextApiHandler, NextApiResponse } from 'next'
import connect from 'next-connect'

import { apiOptions, getUser } from '@pickle/lib/api'
import { prisma } from '@pickle/lib/prisma'
import { ProfileResponse } from '@pickle/types/api'

const handler: NextApiHandler = connect(apiOptions).get(
  async (req, res: NextApiResponse<ProfileResponse>) => {
    const user = await getUser(req)

    const profile = await prisma.profile.findUnique({
      where: {
        id: user.id
      }
    })

    res.json({
      profile
    })
  }
)

export default handler
