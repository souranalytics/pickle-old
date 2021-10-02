import React, { FunctionComponent } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
  color?: 'primary' | 'white' | 'black' | 'error' | 'success'
  size?: 'small' | 'medium' | 'large'
}

export const Spinner: FunctionComponent<Props> = ({
  className,
  color,
  size
}) => (
  <div
    className={twMerge(
      'rounded-full animate-spin',
      className,
      color === 'white'
        ? 'border-white'
        : color === 'black'
        ? 'border-black'
        : color === 'error'
        ? 'border-rose-600'
        : color === 'success'
        ? 'border-emerald-600'
        : 'border-primary-600',
      size === 'large'
        ? 'h-8 w-8 border-4'
        : size === 'medium'
        ? 'h-6 w-6 border-[3px]'
        : 'h-4 w-4 border-2'
    )}
    style={{
      borderTopColor: 'transparent'
    }}
  />
)
