import React, { FunctionComponent } from 'react'

type Props = {
  title: string
}

export const Header: FunctionComponent<Props> = ({ children, title }) => (
  <header className="flex items-center justify-between p-4 border-b border-gray-100">
    <h1 className="text-2xl font-semibold">{title}</h1>

    {children}
  </header>
)
