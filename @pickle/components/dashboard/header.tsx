import React, { FunctionComponent } from 'react'

import { Spinner } from '../common/spinner'

type Props = {
  loading?: boolean
  title: string
}

export const Header: FunctionComponent<Props> = ({
  children,
  loading,
  title
}) => (
  <header className="flex items-end p-4 border-b border-gray-100">
    <div className="flex items-center flex-1">
      <h1 className="text-xl font-semibold leading-none">{title}</h1>
      {loading && <Spinner className="ml-4" size="small" />}
    </div>

    {children}
  </header>
)
