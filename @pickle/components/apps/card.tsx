import { App } from '@prisma/client'
import Link from 'next/link'
import React, { FunctionComponent } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
  app: App
}

export const AppCard: FunctionComponent<Props> = ({ app, className }) => (
  <Link href={`/dashboard/${app.id}`}>
    <a
      className={twMerge(
        'bg-primary-50 hover:bg-primary-100 p-4 rounded-xl text-xl font-medium text-black',
        className
      )}>
      {app.name}
    </a>
  </Link>
)
