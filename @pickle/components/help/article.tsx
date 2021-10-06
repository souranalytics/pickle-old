import React, { FunctionComponent, useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { twMerge } from 'tailwind-merge'

import { HelpArticle } from '@pickle/types/graphcms'

type Props = {
  className?: string
  article: HelpArticle
}

export const ArticleCard: FunctionComponent<Props> = ({
  article,
  className
}) => {
  const [active, setActive] = useState(false)

  const href = `#${article.slug}`

  useEffect(() => {
    setActive(window.location.hash === href)

    const handler = () => setActive(window.location.hash === href)

    window.addEventListener('hashchange', handler, false)

    return () => {
      window.removeEventListener('hashchange', handler, false)
    }
  }, [href])

  return (
    <article
      className={twMerge(
        'p-4 text-left rounded-lg',
        active ? 'bg-primary-50' : 'bg-gray-50',
        className
      )}>
      <h2 className="text-xl font-semibold" id={article.slug}>
        <a href={href}>{article.title}</a>
      </h2>
      <Markdown className="mt-2 prose">{article.content}</Markdown>
    </article>
  )
}
