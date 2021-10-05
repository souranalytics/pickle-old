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
      'flex flex-col items-center rounded-2xl p-8 lg:w-40',
      plan.id === 'small'
        ? 'bg-violet-200'
        : plan.id === 'nano'
        ? 'bg-indigo-200'
        : plan.id === 'micro'
        ? 'bg-sky-200'
        : 'bg-teal-200',
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
      {millify(plan.screens)}
    </div>
    <div className="text-sm text-gray-600">
      {pluralize('screen', plan.screens)}
    </div>

    <div className="mt-4 font-mono text-2xl font-medium">
      {plan.collaborators}
    </div>
    <div className="text-sm text-gray-600">
      {pluralize('collaborator', plan.collaborators)}
    </div>
  </div>
)
