import React, { FunctionComponent } from 'react'
import { twMerge } from 'tailwind-merge'

import { Icon } from './icon'

type Props = {
  className?: string
  type?: 'message' | 'error' | 'success'
}

export const Message: FunctionComponent<Props> = ({
  children,
  className,
  type = 'message'
}) => (
  <div
    className={twMerge(
      'flex items-center text-black font-medium rounded-xl p-3',
      type === 'error'
        ? 'bg-rose-100'
        : type === 'success'
        ? 'bg-emerald-100'
        : 'bg-sky-100',
      className
    )}>
    <Icon
      className={
        type === 'error'
          ? 'text-rose-600'
          : type === 'success'
          ? 'text-emerald-600'
          : 'text-sky-600'
      }
      name={
        type === 'error' ? 'error' : type === 'success' ? 'success' : 'info'
      }
      size={24}
    />

    <div className="flex-1 ml-3">{children}</div>
  </div>
)
