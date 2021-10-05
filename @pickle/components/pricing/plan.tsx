import { Plan } from '@prisma/client'
import millify from 'millify'
import pluralize from 'pluralize'
import React, { FunctionComponent } from 'react'
import { twMerge } from 'tailwind-merge'

import { formatAmount } from '@pickle/lib/utils'

type Props = {
  className?: string
  plan: Plan
}

export const PlanCard: FunctionComponent<Props> = ({ className, plan }) => (
  <div
    className={twMerge(
      'flex flex-col items-center rounded-2xl p-8 bg-gradient-to-tr',
      plan.id === 'nano'
        ? 'from-accent-100 to-accent-300'
        : plan.id === 'micro'
        ? 'from-primary-100 to-primary-300'
        : plan.id === 'small'
        ? 'from-accent-100 to-accent-300'
        : 'from-primary-100 to-primary-300',
      className
    )}>
    <div className="text-xl font-medium">{plan.name}</div>

    <div className="mt-4 font-mono text-4xl font-semibold">
      {formatAmount(plan.price)}
    </div>

    <div className="mt-4 font-mono text-2xl font-medium">
      {millify(plan.events)}
    </div>
    <div className="text-sm text-gray-600">
      {pluralize('event', plan.events)}
    </div>

    <div className="mt-4 font-mono text-2xl font-medium">
      {millify(plan.views)}
    </div>
    <div className="text-sm text-gray-600">{pluralize('view', plan.views)}</div>

    <div className="mt-4 font-mono text-2xl font-medium">
      {plan.collaborators}
    </div>
    <div className="text-sm text-gray-600">
      {pluralize('collaborator', plan.collaborators)}
    </div>
  </div>
)
