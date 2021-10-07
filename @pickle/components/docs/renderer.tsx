import Markdown from 'markdown-to-jsx'
import React, { FunctionComponent, useEffect } from 'react'

import { highlight } from '@pickle/lib/highlight'

import { Url } from './url'

type Props = {
  children: string
}

export const MarkdownRenderer: FunctionComponent<Props> = ({ children }) => {
  useEffect(() => {
    highlight()
  }, [])

  return (
    <Markdown
      options={{
        overrides: {
          Url: {
            component: Url,
            props: {
              className: 'mt-4'
            }
          },
          code: {
            props: {
              className: 'rounded-lg'
            }
          },
          h2: {
            props: {
              className: 'text-4xl font-semibold mt-16'
            }
          },
          h3: {
            props: {
              className: 'text-2xl font-semibold mt-8'
            }
          },
          h4: {
            props: {
              className: 'text-xl font-medium mt-4'
            }
          },
          li: {
            props: {
              className: 'my-2'
            }
          },
          ol: {
            props: {
              className: 'mt-4 list-decimal list-inside'
            }
          },
          p: {
            props: {
              className: 'mt-2 first:mt-0'
            }
          },
          pre: {
            props: {
              className: 'mt-4 text-sm'
            }
          },
          strong: {
            props: {
              className: 'font-semibold'
            }
          },
          ul: {
            props: {
              className: 'mt-4 list-disc list-inside'
            }
          }
        }
      }}>
      {children}
    </Markdown>
  )
}
