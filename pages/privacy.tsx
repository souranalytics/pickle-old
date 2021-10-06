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

const Privacy: NextPage<Props> = ({ asset, page }) => (
  <>
    <Head>
      <title>{page.title}: Pickle</title>
    </Head>

    <Header />

    <main className="flex flex-col items-center justify-center text-center">
      <Image
        alt="Privacy"
        height={asset.height}
        src={asset.url}
        unoptimized
        width={asset.width}
      />

      <h1 className="mt-8 text-6xl font-bold">{page.title}</h1>

      <Markdown className="mt-8 prose-xl">{page.content}</Markdown>
    </main>

    <Footer />
  </>
)

export const getStaticProps: GetStaticProps<Props> = async () => {
  const page = await getPage('privacy')
  const asset = await getAsset('ckuf8683khe470c6036536fx9')

  return {
    props: {
      asset,
      page
    }
  }
}

export default Privacy
