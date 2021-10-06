import { GetServerSideProps, NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import { twMerge } from 'tailwind-merge'

import { Button } from '@pickle/components/common/button'
import { Form } from '@pickle/components/common/form'
import { Input } from '@pickle/components/common/input'
import { Message } from '@pickle/components/common/message'
import { Spinner } from '@pickle/components/common/spinner'
import { Layout } from '@pickle/components/dashboard/layout'
import { PlansCard } from '@pickle/components/pricing/plans'
import { useUpdateApp } from '@pickle/hooks/apps/update'
import { getUser } from '@pickle/lib/auth'
import { AppResponse } from '@pickle/types/api'

type Props = {
  slug: string
}

const Dashboard: NextPage<Props> = ({ slug }) => {
  const { data } = useSWR<AppResponse>(`/apps/${slug}`)

  const { error, loading, updateApp } = useUpdateApp(slug)

  const [name, setName] = useState('')
  const [planId, setPlanId] = useState<string>()

  useEffect(() => {
    if (data?.app) {
      setName(data.app.name)
      setPlanId(data.app.planId)
    }
  }, [data])

  return (
    <Layout title="Settings">
      {error && (
        <Message className="mb-8" type="error">
          {error}
        </Message>
      )}

      {data ? (
        <Form
          loading={loading}
          onSubmit={async () => {
            if (!planId) {
              return
            }

            await updateApp(name, planId)

            await mutate('/apps')
          }}>
          <Input
            className="lg:w-80"
            label="App name"
            onChange={name => setName(name)}
            placeholder="Name"
            required
            type="text"
            value={name}
          />

          <PlansCard
            className="mt-8"
            onChange={planId => setPlanId(planId)}
            value={planId}
          />

          <Button className="mt-8" loading={loading}>
            Save
          </Button>
        </Form>
      ) : (
        <Spinner className={twMerge(error && 'mt-8')} />
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
