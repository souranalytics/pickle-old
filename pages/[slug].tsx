import Markdown from 'markdown-to-jsx'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

import { Footer } from '@pickle/components/common/footer'
import { Header } from '@pickle/components/common/header'
import { getDimensions } from '@pickle/lib/asset'
import { getPage, getPages } from '@pickle/lib/graphcms'
import { Page } from '@pickle/types/graphcms'

type Props = {
  page: Page
}

type Params = {
  slug: string
}

const GraphCMSPage: NextPage<Props> = ({ page }) => (
  <>
    <Head>
      <title>{page.title}: Pickle</title>
    </Head>

    <Header />

    <main className="flex flex-col items-center justify-center text-center">
      <Image
        {...getDimensions(page.image)}
        alt={page.title}
        src={page.image.url}
        unoptimized
      />

      <h1 className="mt-8 text-6xl font-bold">{page.title}</h1>

      <Markdown className="mt-8 prose-xl">{page.content}</Markdown>
    </main>

    <Footer />
  </>
)

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const pages = await getPages()

  return {
    fallback: false,
    paths: pages.map(slug => ({
      params: {
        slug
      }
    }))
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params
}) => {
  if (!params) {
    return {
      notFound: true
    }
  }

  const { slug } = params

  const page = await getPage(slug)

  return {
    props: {
      page
    }
  }
}

export default GraphCMSPage
