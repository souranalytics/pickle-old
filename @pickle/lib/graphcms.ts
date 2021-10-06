import { gql, GraphQLClient } from 'graphql-request'

import { Asset } from '@pickle/types/components'
import {
  AssetUrlArgs,
  HelpArticle,
  ImageFit,
  Page,
  Query,
  QueryAssetArgs,
  QueryPageArgs
} from '@pickle/types/graphcms'

import { calculateClip } from './asset'

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

export const getHelpArticles = async (): Promise<Array<HelpArticle>> => {
  const { helpArticles } = await graphcms.request<Pick<Query, 'helpArticles'>>(
    gql`
      query {
        helpArticles {
          slug
          title
          content
          createdAt
          updatedAt
        }
      }
    `
  )

  return helpArticles
}

export const getAsset = async (id: string, size = 500): Promise<Asset> => {
  const { asset } = await graphcms.request<
    Pick<Query, 'asset'>,
    QueryAssetArgs & AssetUrlArgs
  >(
    gql`
      query (
        $where: AssetWhereUniqueInput!
        $transformation: AssetTransformationInput
      ) {
        asset(where: $where) {
          url(transformation: $transformation)
          height
          width
        }
      }
    `,
    {
      transformation: {
        image: {
          resize: {
            fit: ImageFit.Clip,
            height: size * 2,
            width: size * 2
          }
        }
      },
      where: {
        id
      }
    }
  )

  if (!asset) {
    throw new Error('Asset not found')
  }

  return {
    ...calculateClip(asset.width as number, asset.height as number, size, size),
    url: asset.url
  }
}
