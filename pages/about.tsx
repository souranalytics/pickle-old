import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Markdown from 'react-markdown'

import { Footer } from '@pickle/components/common/footer'
import { Header } from '@pickle/components/common/header'
import { getDimensions } from '@pickle/lib/asset'
import { getPage } from '@pickle/lib/graphcms'
import { Page } from '@pickle/types/graphcms'

type Props = {
  page: Page
}

const About: NextPage<Props> = ({ page }) => (
  <>
    <Head>
      <title>{page.title}: Pickle</title>
    </Head>

    <Header />

    <main className="flex flex-col items-center justify-center text-center">
      <Image
        {...getDimensions(page.image)}
        alt="About"
        src={page.image.url}
        unoptimized
      />

      <h1 className="mt-8 text-6xl font-bold">{page.title}</h1>

      <Markdown className="mt-8 prose-xl">{page.content}</Markdown>
    </main>

    <Footer />
  </>
)

export const getStaticProps: GetStaticProps<Props> = async () => {
  const page = await getPage('about')

  return {
    props: {
      page
    }
  }
}

export default About
