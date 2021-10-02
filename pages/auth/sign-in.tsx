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
import { useSignIn } from '@pickle/hooks/auth/sign-in'
import { supabase } from '@pickle/lib/supabase/server'

const SignIn: NextPage = () => {
  const { error, loading, signUp } = useSignIn()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <Head>
        <title>Sign in: Pickle</title>
      </Head>

      <Header />

      <main>
        <h1 className="text-6xl font-bold">Sign in</h1>

        {error && (
          <Message className="mt-8" type="error">
            {error}
          </Message>
        )}

        <Form
          className="mt-8 lg:w-80"
          loading={loading}
          onSubmit={() => signUp(email, password)}>
          <Input
            label="Email address"
            onChange={email => setEmail(email)}
            placeholder="Email"
            required
            type="email"
            value={email}
          />

          <Input
            className="mt-8"
            label="Password"
            minLength={12}
            onChange={password => setPassword(password)}
            placeholder="Password"
            required
            type="password"
            value={password}
          />

          <div className="flex items-center mt-8">
            <Button loading={loading}>Sign in</Button>

            <Link href="/auth/reset">
              <a className="ml-4 font-medium text-black">Forgot password?</a>
            </Link>
          </div>
        </Form>
      </main>

      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (user) {
    return {
      redirect: {
        destination: '/apps',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default SignIn
