import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { Footer } from '@pickle/components/common/footer'
import { Header } from '@pickle/components/common/header'
import { Headings } from '@pickle/components/docs/headings'
import { MarkdownRenderer } from '@pickle/components/docs/renderer'
import { getPage } from '@pickle/lib/graphcms'
import { Page } from '@pickle/types/graphcms'

type Props = {
  page: Page
}

const Docs: NextPage<Props> = ({ page }) => (
  <>
    <Head>
      <title>{page.title}: Pickle</title>
    </Head>

    <Header />

    <main>
      <h1 className="text-6xl font-bold">{page.title}</h1>

      <div className="flex flex-col lg:flex-row lg:mt-8">
        <aside className="mt-8 bg-gray-100 rounded-t-xl lg:rounded-tr-none lg:rounded-l-xl lg:mt-0 lg:w-52">
          <Headings content={page.content} />
        </aside>

        <section className="flex-1 p-4 rounded-b-xl lg:rounded-bl-none lg:rounded-r-xl bg-gray-50 lg:p-8">
          <MarkdownRenderer>{page.content}</MarkdownRenderer>
        </section>
      </div>
    </main>

    <Footer />
  </>
)

export const getStaticProps: GetStaticProps<Props> = async () => {
  const page = await getPage('docs')

  return {
    props: {
      page
    }
  }
}

export default Docs
