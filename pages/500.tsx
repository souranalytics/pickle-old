import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

import { Footer } from '@pickle/components/common/footer'
import { Header } from '@pickle/components/common/header'

const ServerError: NextPage = () => (
  <>
    <Head>
      <title>Error: Pickle</title>
    </Head>

    <Header />

    <main className="flex flex-col items-center justify-center text-center">
      <Image
        alt="Server error"
        height={2500 / 10}
        src="https://kousttopufrewjfhpsmg.supabase.in/storage/v1/object/public/hero/server-error.png"
        width={2500 / 10}
      />

      <h1 className="mt-8 text-6xl font-bold">Error</h1>
      <p className="mt-2 text-xl">Something went wrong. Try again later?</p>
    </main>

    <Footer />
  </>
)

export default ServerError
