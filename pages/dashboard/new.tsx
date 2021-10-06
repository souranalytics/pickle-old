import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'

import { Button } from '@pickle/components/common/button'
import { Footer } from '@pickle/components/common/footer'
import { Form } from '@pickle/components/common/form'
import { Header } from '@pickle/components/common/header'
import { Input } from '@pickle/components/common/input'
import { Message } from '@pickle/components/common/message'
import { PlansCard } from '@pickle/components/pricing/plans'
import { useCreateApp } from '@pickle/hooks/apps/create'
import { getUser } from '@pickle/lib/auth'

const SignIn: NextPage = () => {
  const { createApp, error, loading } = useCreateApp()

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

          <PlansCard
            className="mt-8"
            onChange={planId => setPlanId(planId)}
            value={planId}
          />

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
