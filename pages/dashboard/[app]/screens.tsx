import compact from 'lodash/compact'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'
import { twMerge } from 'tailwind-merge'

import { Icon } from '@pickle/components/common/icon'
import { Message } from '@pickle/components/common/message'
import { Layout } from '@pickle/components/dashboard/layout'
import { ScreenCard } from '@pickle/components/screens/card'
import { getUser } from '@pickle/lib/auth'
import { ScreensResponse } from '@pickle/types/api'

type Props = {
  slug: string
}

const Dashboard: NextPage<Props> = ({ slug }) => {
  const router = useRouter()

  const url = compact([`/screens?slug=${slug}`, router.query.after]).join(
    '&after='
  )

  const { data, error, isValidating } = useSWR<ScreensResponse>(url)

  return (
    <Layout
      header={
        router.query.after ? undefined : (
          <button className="p-4 text-primary-600">
            <Icon name="sync" />
          </button>
        )
      }
      loading={isValidating}
      title="Screens">
      {error && (
        <Message className={twMerge(data && 'mb-8')} type="error">
          {error.message}
        </Message>
      )}

      {data && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>User</th>
              <th colSpan={2}>Created</th>
            </tr>
          </thead>

          <tbody className="font-mono text-sm">
            {data.screens.map(screen => (
              <ScreenCard key={screen.id} screen={screen} />
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
  req
}) => {
  const user = await getUser(req)

  if (!user) {
    return {
      redirect: {
        destination: '/auth/sign-in',
        permanent: false
      }
    }
  }

  return {
    props: {
      slug: String(query.app)
    }
  }
}

export default Dashboard
