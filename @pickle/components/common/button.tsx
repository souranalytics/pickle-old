import React, { ButtonHTMLAttributes, FunctionComponent } from 'react'
import { twMerge } from 'tailwind-merge'

import { Spinner } from './spinner'

type Props = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'onClick' | 'disabled' | 'type'
> & {
  loading?: boolean
}

export const Button: FunctionComponent<Props> = ({ loading, ...props }) => {
  const { children, className, disabled } = props

  return (
    <button
      {...props}
      className={twMerge('button flex items-center justify-center', className)}
      disabled={disabled || loading}>
      {children}
      {loading && <Spinner className="ml-2" color="white" />}
    </button>
  )
}
