import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Markdown from 'react-markdown'

import { Footer } from '@pickle/components/common/footer'
import { Header } from '@pickle/components/common/header'
import { getAsset, getPage } from '@pickle/lib/graphcms'
import { Asset } from '@pickle/types/components'
import { Page } from '@pickle/types/graphcms'

type Props = {
  asset: Asset
  page: Page
}

const Terms: NextPage<Props> = ({ asset, page }) => (
  <>
    <Head>
      <title>{page.title}: Pickle</title>
    </Head>

    <Header />

    <main className="flex flex-col items-center justify-center text-center">
      <Image
        alt="Terms"
        height={asset.height}
        src={asset.url}
        width={asset.width}
      />

      <h1 className="mt-8 text-6xl font-bold">{page.title}</h1>

      <Markdown className="mt-8 prose-xl">{page.content}</Markdown>
    </main>

    <Footer />
  </>
)

export const getStaticProps: GetStaticProps<Props> = async () => {
  const page = await getPage('terms')
  const asset = await getAsset('ckuf8683k95dr0b15uq4z8qma')

  return {
    props: {
      asset,
      page
    }
  }
}

export default Terms
