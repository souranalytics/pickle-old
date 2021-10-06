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
        'self-center p-2 text-sm font-medium leading-none text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-500 active:bg-primary-700',
        className
      )}
      onClick={() => onChange(next)}>
      Next
    </button>
  )
}
