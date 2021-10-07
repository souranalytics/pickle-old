import kebabCase from 'lodash/kebabCase'

import { Heading } from '@pickle/types/components'

const headingLevel = (data: string): number => data.match(/#/g)?.length ?? 0

export const getHeadings = (content: string): Array<Heading> =>
  content
    .split('\n')
    .filter(data => data.startsWith('#'))
    .map(data => {
      const level = headingLevel(data)

      return {
        anchor: kebabCase(data),
        level,
        title: data.slice(level + 1)
      }
    })
