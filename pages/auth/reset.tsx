import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'

import { Button } from '@pickle/components/common/button'
import { Footer } from '@pickle/components/common/footer'
import { Form } from '@pickle/components/common/form'
import { Header } from '@pickle/components/common/header'
import { Input } from '@pickle/components/common/input'
import { Message } from '@pickle/components/common/message'
import { useResetPassword } from '@pickle/hooks/auth/reset-password'
import { getUser } from '@pickle/lib/auth'

const ResetPassword: NextPage = () => {
  const { error, loading, resetPassword, success } = useResetPassword()

  const [email, setEmail] = useState('')

  return (
    <>
      <Head>
        <title>Reset password: Pickle</title>
      </Head>

      <Header />

      <main>
        <h1 className="text-6xl font-bold">Reset password</h1>

        {error && (
          <Message className="mt-8" type="error">
            {error}
          </Message>
        )}

        {success && (
          <Message className="mt-8" type="success">
            {success}
          </Message>
        )}

        <Form
          className="mt-8 lg:w-80"
          loading={loading}
          onSubmit={async () => {
            await resetPassword(email)

            setEmail('')
          }}>
          <Input
            label="What's your email?"
            onChange={email => setEmail(email)}
            placeholder="Email"
            required
            type="email"
            value={email}
          />

          <div className="flex items-center mt-8">
            <Button loading={loading}>Reset password</Button>

            <Link href="/auth/sign-in">
              <a className="ml-4 font-medium text-black">Have an account?</a>
            </Link>
          </div>
        </Form>
      </main>

      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = await getUser(req)

  if (user) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default ResetPassword
