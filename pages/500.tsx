import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

import { Footer } from '@pickle/components/common/footer'
import { Header } from '@pickle/components/common/header'
import { getAsset } from '@pickle/lib/graphcms'
import { Asset } from '@pickle/types/components'

type Props = {
  asset: Asset
}

const ServerError: NextPage<Props> = ({ asset }) => (
  <>
    <Head>
      <title>Error: Pickle</title>
    </Head>

    <Header />

    <main className="flex flex-col items-center justify-center text-center">
      <Image
        alt="Server error"
        height={asset.height}
        src={asset.url}
        unoptimized
        width={asset.width}
      />

      <h1 className="mt-8 text-6xl font-bold">Error</h1>
      <p className="mt-2 text-xl">Something went wrong. Try again later?</p>
    </main>

    <Footer />
  </>
)

export const getStaticProps: GetStaticProps<Props> = async () => {
  const asset = await getAsset('ckuf8683k95e20b151g7rry2a')

  return {
    props: {
      asset
    }
  }
}

export default ServerError
