import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Footer } from '@pickle/components/common/footer'
import { Header } from '@pickle/components/common/header'

const Home: NextPage = () => (
  <>
    <Head>
      <title>Pickle: sour analytics</title>
    </Head>

    <Header />

    <main className="flex flex-col items-center lg:flex-row-reverse lg:justify-between">
      <Image
        alt="Pickle"
        height={2500 / 5}
        src="https://kousttopufrewjfhpsmg.supabase.in/storage/v1/object/public/hero/pickle.png"
        width={2500 / 5}
      />

      <section className="flex flex-col items-center mt-16 text-center lg:items-start lg:text-left lg:mt-0">
        <h1 className="text-6xl font-bold">Pickle</h1>
        <div className="mt-4 text-4xl font-medium text-gray-800">
          Privacy and developer first analytics
        </div>

        <Link href="/auth/sign-up">
          <a className="mt-8 text-xl !rounded-full button">
            Get started for free
          </a>
        </Link>
      </section>
    </main>

    <Footer />
  </>
)

export default Home
