import React, { FunctionComponent, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

import { getHeadings } from '@pickle/lib/parsers'

type Props = {
  content: string
}

export const Headings: FunctionComponent<Props> = ({ content }) => {
  const headings = useMemo(() => getHeadings(content), [content])

  return (
    <nav className="sticky top-0 flex flex-col py-4">
      {headings.map(({ anchor, level, title }) => (
        <a
          className={twMerge(
            'text-gray-600 hover:text-gray-800 hover:bg-gray-50 first:mt-0 px-4 py-2 font-medium',
            level === 2 && 'mt-4',
            level === 3 && 'pl-6 text-sm',
            level === 4 && 'pl-8 text-xs'
          )}
          href={`#${anchor}`}
          key={anchor}>
          {title}
        </a>
      ))}
    </nav>
  )
}
