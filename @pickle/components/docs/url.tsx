import React, { FunctionComponent } from 'react'
import { twMerge } from 'tailwind-merge'

import { useCopy } from '@pickle/hooks/utils/copy'

import { Icon } from '../common/icon'

type Props = {
  className?: string
  label: string
  value: string
}

export const Url: FunctionComponent<Props> = ({ className, label, value }) => {
  const [copy, copied] = useCopy()

  return (
    <div
      className={twMerge(
        'flex items-center overflow-hidden leading-none',
        className
      )}>
      <div className="p-3 bg-yellow-200 rounded-l-lg">{label}</div>
      <div className="p-3 bg-white">{value}</div>
      <button className="p-2 bg-white rounded-r-lg" onClick={() => copy(value)}>
        <Icon
          className={copied ? 'text-emerald-600' : 'text-gray-600'}
          name={copied ? 'success' : 'copy'}
        />
      </button>
    </div>
  )
}
