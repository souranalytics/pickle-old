import Head from 'next/head'
import React, { FunctionComponent } from 'react'
import { twMerge } from 'tailwind-merge'

import { Header } from './header'
import { SideBar } from './sidebar'

type Props = {
  className?: string
  header?: JSX.Element
  loading?: boolean
  title: string
}

export const Layout: FunctionComponent<Props> = ({
  children,
  className,
  header,
  loading,
  title
}) => (
  <>
    <Head>
      <title>Dashboard: Pickle</title>
    </Head>

    <main className="flex flex-col bg-white lg:flex-row dashboard xl:border-l xl:border-r xl:border-primary-100">
      <SideBar />

      <section className="flex flex-col flex-1">
        <Header loading={loading} title={title}>
          {header}
        </Header>

        <div className={twMerge('flex-1 m-4', className)}>{children}</div>
      </section>
    </main>
  </>
)
