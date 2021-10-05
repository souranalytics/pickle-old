import Head from 'next/head'
import React, { FunctionComponent } from 'react'
import { twMerge } from 'tailwind-merge'

import { Header } from './header'
import { SideBar } from './sidebar'

type Props = {
  className?: string
  header?: JSX.Element
  title: string
}

export const Layout: FunctionComponent<Props> = ({
  children,
  className,
  header,
  title
}) => (
  <>
    <Head>
      <title>Dashboard: Pickle</title>
    </Head>

    <main className="flex bg-white dashboard">
      <SideBar />

      <section className="flex flex-col flex-1">
        <Header title={title}>{header}</Header>

        <div className={twMerge('flex-1 m-4', className)}>{children}</div>
      </section>
    </main>
  </>
)
