import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import useSWR from 'swr'
import { twMerge } from 'tailwind-merge'

import { Button } from '@pickle/components/common/button'
import { Footer } from '@pickle/components/common/footer'
import { Form } from '@pickle/components/common/form'
import { Header } from '@pickle/components/common/header'
import { Input } from '@pickle/components/common/input'
import { Message } from '@pickle/components/common/message'
import { Spinner } from '@pickle/components/common/spinner'
import { useNewApp } from '@pickle/hooks/apps/new'
import { getUser } from '@pickle/lib/auth'
import { formatAmount } from '@pickle/lib/utils'
import { PlansResponse } from '@pickle/types/api'

const SignIn: NextPage = () => {
  const { data } = useSWR<PlansResponse>('/plans')

  const { createApp, error, loading } = useNewApp()

  const [name, setName] = useState('')
  const [planId, setPlanId] = useState<string>()

  return (
    <>
      <Head>
        <title>New app: Pickle</title>
      </Head>

      <Header />

      <main>
        <h1 className="text-6xl font-bold">New app</h1>

        {error && (
          <Message className="mt-8" type="error">
            {error}
          </Message>
        )}

        <Form
          className="mt-8"
          loading={loading}
          onSubmit={() => {
            if (!planId) {
              return
            }

            return createApp(name, planId)
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

          <div className="mt-8 font-medium text-gray-600">Pick a plan</div>
          {data ? (
            <div className="flex mt-2">
              {data.plans.map(plan => (
                <button
                  className={twMerge(
                    'flex flex-col items-center p-3 ml-4 first:ml-0 transition',
                    plan.id === planId
                      ? 'bg-primary-600 text-white rounded-xl'
                      : 'bg-primary-200 rounded-lg'
                  )}
                  key={plan.id}
                  onClick={() => setPlanId(plan.id)}
                  type="button">
                  <div>{plan.name}</div>
                  <div className="text-xl font-medium">
                    {formatAmount(plan.price)}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <Spinner className="mt-2" />
          )}
          <div className="mt-2 text-gray-600">
            Find more details on the{' '}
            <Link href="/pricing">
              <a>pricing page</a>
            </Link>
            .
          </div>

          <Button className="mt-8" loading={loading}>
            Create
          </Button>
        </Form>
      </main>

      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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
    props: {}
  }
}

export default SignIn
