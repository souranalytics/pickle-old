import React, { FunctionComponent } from 'react'

type Props = {
  title: string
}

export const Header: FunctionComponent<Props> = ({ children, title }) => (
  <header className="flex items-center justify-between border-b border-gray-100">
    <h1 className="mx-4 my-3 text-lg font-semibold">{title}</h1>

    {children}
  </header>
)
