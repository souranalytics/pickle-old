import Link from 'next/link'
import React, { FunctionComponent } from 'react'
import useSWR from 'swr'
import { twMerge } from 'tailwind-merge'

import { formatAmount } from '@pickle/lib/utils'
import { PlansResponse } from '@pickle/types/api'

import { Spinner } from '../common/spinner'

type Props = {
  className?: string
  value?: string

  onChange: (planId: string) => void
}

export const PlansCard: FunctionComponent<Props> = ({
  className,
  onChange,
  value
}) => {
  const { data } = useSWR<PlansResponse>('/plans')

  return (
    <div className={className}>
      <div className="font-medium text-gray-600">Pick a plan</div>

      {data ? (
        <div className="flex mt-2">
          {data.plans.map(plan => (
            <button
              className={twMerge(
                'flex flex-col items-center p-3 ml-4 first:ml-0 transition',
                plan.id === value
                  ? 'bg-primary-600 text-white rounded-xl'
                  : 'bg-primary-200 rounded-lg'
              )}
              key={plan.id}
              onClick={() => onChange(plan.id)}
              type="button">
              <div>{plan.name}</div>
              <div className="text-xl font-medium">
                {formatAmount(plan.price)}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <Spinner className="mt-2" />
      )}

      <div className="mt-2 text-gray-600">
        Find more details on the{' '}
        <Link href="/pricing">
          <a>pricing page</a>
        </Link>
        .
      </div>
    </div>
  )
}
