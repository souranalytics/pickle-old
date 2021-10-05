import { NextApiHandler, NextApiResponse } from 'next'

import { prisma } from '@pickle/lib/prisma'
import { PlansResponse } from '@pickle/types/api'

const handler: NextApiHandler = async (
  req,
  res: NextApiResponse<PlansResponse>
): Promise<void> => {
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

export default handler
