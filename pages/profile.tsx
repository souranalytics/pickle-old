import Avatar from 'boring-avatars'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import useSWR from 'swr'

import { Footer } from '@pickle/components/common/footer'
import { Header } from '@pickle/components/common/header'
import { Spinner } from '@pickle/components/common/spinner'
import { getUser } from '@pickle/lib/auth'
import { ProfileResponse } from '@pickle/types/api'

const Profile: NextPage = () => {
  const { data } = useSWR<ProfileResponse>('/profile')

  return (
    <>
      <Head>
        <title>Profile: Pickle</title>
      </Head>

      <Header />

      <main className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">Profile</h1>

        {data?.profile ? (
          <div className="flex flex-col items-center mt-8">
            <Avatar name={data.profile.email} size={128} variant="beam" />
            <div className="mt-4 text-2xl font-semibold">
              {data.profile.name}
            </div>
            <div>{data.profile.email}</div>
          </div>
        ) : (
          <Spinner className="mt-8" />
        )}
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

export default Profile
