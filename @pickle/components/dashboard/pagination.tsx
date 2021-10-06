import React, { FunctionComponent } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
  next?: number | string

  onChange: (id: number | string) => void
}

export const Pagination: FunctionComponent<Props> = ({
  className,
  next,
  onChange
}) => {
  if (next === undefined) {
    return null
  }

  return (
    <button
      className={twMerge(
        'bg-emerald-600 transition-colors hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-lg px-3 py-2 font-medium text-sm',
        className
      )}
      onClick={() => onChange(next)}>
      Next
    </button>
  )
}
