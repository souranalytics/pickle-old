import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

import { Footer } from '@pickle/components/common/footer'
import { Header } from '@pickle/components/common/header'
import { ArticleCard } from '@pickle/components/help/article'
import { getAsset, getHelpArticles } from '@pickle/lib/graphcms'
import { Asset } from '@pickle/types/asset'
import { HelpArticle } from '@pickle/types/graphcms'

type Props = {
  asset: Asset
  articles: Array<HelpArticle>
}

const Help: NextPage<Props> = ({ articles, asset }) => (
  <>
    <Head>
      <title>Help: Pickle</title>
    </Head>

    <Header />

    <main className="flex flex-col items-center justify-center text-center">
      <Image
        alt="Help"
        height={asset.height}
        src={asset.url}
        unoptimized
        width={asset.width}
      />

      <h1 className="mt-8 text-6xl font-bold">Help</h1>

      {articles.map(article => (
        <ArticleCard article={article} className="mt-8" key={article.slug} />
      ))}
    </main>

    <Footer />
  </>
)

export const getStaticProps: GetStaticProps<Props> = async () => {
  const articles = await getHelpArticles()
  const asset = await getAsset('ckuf8683k96fn0c067tpzj5zy')

  return {
    props: {
      articles,
      asset
    }
  }
}

export default Help
