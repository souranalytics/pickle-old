import { NextApiHandler, NextApiResponse } from 'next'
import connect from 'next-connect'

import { apiOptions } from '@pickle/lib/api'
import { prisma } from '@pickle/lib/prisma'
import { PlansResponse } from '@pickle/types/api'

const handler: NextApiHandler = connect(apiOptions).get(
  async (req, res: NextApiResponse<PlansResponse>) => {
    const plans = await prisma.plan.findMany({
      orderBy: {
        price: 'asc'
      },
      where: {
        visible: true
      }
    })

    res.json({
      plans
    })
  }
)

export default handler
