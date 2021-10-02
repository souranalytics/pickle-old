import { gql, GraphQLClient } from 'graphql-request'

import { Page, Query, QueryPageArgs } from '@pickle/types/graphcms'

export const graphcms = new GraphQLClient(process.env.GRAPH_CMS_URL)

export const getPage = async (slug: string): Promise<Page> => {
  const { page } = await graphcms.request<Pick<Query, 'page'>, QueryPageArgs>(
    gql`
      query ($where: PageWhereUniqueInput!) {
        page(where: $where) {
          title
          content
          updatedAt
        }
      }
    `,
    {
      where: {
        slug
      }
    }
  )

  if (!page) {
    throw new Error('Page not found')
  }

  return page
}
