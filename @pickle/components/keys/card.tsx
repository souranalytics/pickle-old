import { Key } from '@prisma/client'
import React, { FunctionComponent } from 'react'
import { twMerge } from 'tailwind-merge'

import { Icon } from '../common/icon'

type Props = {
  className?: string
  data: Key
}

export const KeyCard: FunctionComponent<Props> = ({ className, data }) => {
  return (
    <div
      className={twMerge(
        'flex items-center bg-white rounded-lg shadow p-4',
        className
      )}>
      <div className="flex-1 font-medium">{data.name}</div>

      <button>
        <Icon className="ml-4 text-amber-600" name="crown" />
      </button>
    </div>
  )
}
