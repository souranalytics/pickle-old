import React, { FunctionComponent } from 'react'
import { twMerge } from 'tailwind-merge'

import { Key } from '@pickle/types/prisma'

import { Icon } from '../common/icon'

type Props = {
  className?: string
  data: Key
}

export const KeyCard: FunctionComponent<Props> = ({ className, data }) => (
  <div
    className={twMerge(
      'flex items-center bg-white rounded-lg shadow p-4',
      className
    )}>
    <div className="flex-1 font-medium">{data.name}</div>

    <button className="ml-4 text-rose-600">
      <Icon name="trash" size={16} />
    </button>
  </div>
)
