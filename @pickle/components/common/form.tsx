import React, { FunctionComponent, useRef } from 'react'

type Props = {
  className?: string
  loading?: boolean

  onSubmit: () => Promise<unknown> | unknown
}

export const Form: FunctionComponent<Props> = ({
  children,
  className,
  loading,
  onSubmit
}) => {
  const ref = useRef<HTMLFormElement>(null)

  return (
    <form
      className={className}
      onInvalid={event => event.preventDefault()}
      onSubmit={event => {
        event.preventDefault()

        if (loading) {
          return
        }

        onSubmit()
      }}
      ref={ref}>
      {children}
    </form>
  )
}
