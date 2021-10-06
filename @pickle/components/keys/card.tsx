import React, { FunctionComponent } from 'react'
import { twMerge } from 'tailwind-merge'

import { useCopy } from '@pickle/hooks/utils/copy'
import { Key } from '@pickle/types/prisma'

import { Icon } from '../common/icon'

type Props = {
  className?: string
  data: Key
}

export const KeyCard: FunctionComponent<Props> = ({ className, data }) => {
  const [copy, copied] = useCopy()

  return (
    <div
      className={twMerge(
        'flex items-center bg-white rounded-lg shadow',
        className
      )}>
      <div className="flex-1 m-4 font-medium">{data.name}</div>

      <button className="p-4" onClick={() => copy(data.id)}>
        <Icon
          className={copied ? 'text-emerald-600' : 'text-blue-600'}
          name={copied ? 'success' : 'copy'}
        />
      </button>
    </div>
  )
}
