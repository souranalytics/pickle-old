import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/solid'
import React, { FunctionComponent } from 'react'
import { twMerge } from 'tailwind-merge'

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
    {type === 'error' ? (
      <ExclamationCircleIcon className="w-6 h-6 text-rose-600" />
    ) : type === 'success' ? (
      <CheckCircleIcon className="w-6 h-6 text-emerald-600" />
    ) : (
      <InformationCircleIcon className="w-6 h-6 text-sky-600" />
    )}

    <div className="flex-1 ml-3">{children}</div>
  </div>
)
