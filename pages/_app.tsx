import 'tailwindcss/tailwind.css'
import '../styles/global.scss'

import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import { SWRConfig } from 'swr'

import { fetcher, request } from '@pickle/lib/request'
import { supabase } from '@pickle/lib/supabase/client'

const Pickle: NextPage<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) =>
      request('/auth', {
        data: {
          event,
          session
        },
        method: 'post'
      })
    )

    return () => {
      data?.unsubscribe()
    }
  }, [])

  return (
    <SWRConfig
      value={{
        fetcher
      }}>
      <Component {...pageProps} />

      <div id="modal" />
    </SWRConfig>
  )
}

export default Pickle
