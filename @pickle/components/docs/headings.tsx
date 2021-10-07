import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { getHeadings } from '@pickle/lib/parsers'
import { Heading } from '@pickle/types/components'

type Props = {
  content: string
}

export const Headings: FunctionComponent<Props> = ({ content }) => {
  const headings = useMemo(() => getHeadings(content), [content])

  return (
    <nav className="sticky top-0 flex flex-col py-4">
      <h2 className="px-4 mb-4 text-xl font-semibold">Contents</h2>

      {headings.map(heading => (
        <Link heading={heading} key={heading.anchor} />
      ))}
    </nav>
  )
}

type LinksProps = {
  heading: Heading
}

const Link: FunctionComponent<LinksProps> = ({ heading }) => {
  const [active, setActive] = useState(false)

  const href = `#${heading.anchor}`

  useEffect(() => {
    setActive(window.location.hash === href)

    const handler = () => setActive(window.location.hash === href)

    window.addEventListener('hashchange', handler, false)

    return () => {
      window.removeEventListener('hashchange', handler, false)
    }
  }, [href])

  return (
    <a
      className={twMerge(
        'text-black hover:bg-gray-50 px-4 py-2 font-medium',
        heading.level === 3 && 'pl-6 text-sm',
        heading.level === 4 && 'pl-8 text-xs',
        active && 'bg-gray-50'
      )}
      href={href}>
      {heading.title}
    </a>
  )
}
