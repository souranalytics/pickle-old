import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import { Picker } from '@pickle/components/common/picker'
import { Chart } from '@pickle/components/dashboard/chart'
import { Layout } from '@pickle/components/dashboard/layout'
import { getUser } from '@pickle/lib/auth'
import { DashboardInterval, DashboardType } from '@pickle/types/dashboard'

type Props = {
  slug: string
}

const Dashboard: NextPage<Props> = ({ slug }) => {
  const router = useRouter()

  const intervals = [
    {
      label: 'Today',
      value: DashboardInterval.daily
    },
    {
      label: 'Last 7 days',
      value: DashboardInterval.weekly
    },
    {
      label: 'Last 30 days',
      value: DashboardInterval.monthly
    }
  ]

  const interval = (router.query.interval ??
    DashboardInterval.weekly) as DashboardInterval

  return (
    <Layout
      header={
        <Picker
          className="m-4 text-sm"
          data={intervals}
          direction="right"
          onChange={interval =>
            router.push(`/dashboard/${slug}?interval=${interval}`, undefined, {
              scroll: true
            })
          }
          placeholder="Interval"
          value={interval}
        />
      }
      title="Dashboard">
      <div className="grid gap-4 lg:grid-cols-3">
        <Chart interval={interval} slug={slug} type={DashboardType.event} />
        <Chart interval={interval} slug={slug} type={DashboardType.view} />
        <Chart interval={interval} slug={slug} type={DashboardType.user} />
      </div>
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
