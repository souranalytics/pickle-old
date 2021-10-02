import 'tailwindcss/tailwind.css'
import '../styles/global.scss'

import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React from 'react'

const Pickle: NextPage<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)

export default Pickle
