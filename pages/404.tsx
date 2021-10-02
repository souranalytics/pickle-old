import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

import { Footer } from '@pickle/components/common/footer'
import { Header } from '@pickle/components/common/header'

const NotFound: NextPage = () => (
  <>
    <Head>
      <title>Not found: Pickle</title>
    </Head>

    <Header />

    <main className="flex flex-col items-center justify-center text-center">
      <Image
        alt="Not found"
        height={2500 / 10}
        src="https://kousttopufrewjfhpsmg.supabase.in/storage/v1/object/public/hero/not-found.png"
        width={3675 / 10}
      />

      <h1 className="mt-8 text-6xl font-bold">Not found</h1>
      <p className="mt-2 text-xl">
        We can&#39;t find what you&#39;re looking for.
      </p>
    </main>

    <Footer />
  </>
)

export default NotFound
