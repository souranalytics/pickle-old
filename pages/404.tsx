import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

import { Footer } from '@pickle/components/common/footer'
import { Header } from '@pickle/components/common/header'
import { getAsset } from '@pickle/lib/graphcms'
import { Asset } from '@pickle/types/asset'

type Props = {
  asset: Asset
}

const NotFound: NextPage<Props> = ({ asset }) => (
  <>
    <Head>
      <title>Not found: Pickle</title>
    </Head>

    <Header />

    <main className="flex flex-col items-center justify-center text-center">
      <Image
        alt="Not found"
        height={asset.height}
        src={asset.url}
        unoptimized
        width={asset.width}
      />

      <h1 className="mt-8 text-6xl font-bold">Not found</h1>
      <p className="mt-2 text-xl">
        We can&#39;t find what you&#39;re looking for.
      </p>
    </main>

    <Footer />
  </>
)

export const getStaticProps: GetStaticProps<Props> = async () => {
  const asset = await getAsset('ckuf8683kpcfk0b07nqb2kzw8')

  return {
    props: {
      asset
    }
  }
}

export default NotFound
