import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent, useEffect, useState } from 'react'

import { supabase } from '@pickle/lib/supabase/client'
import { Session } from '@pickle/types/supabase'

import { Logo } from './logo'
import { NavLink } from './nav-link'

export const Header: FunctionComponent = () => {
  const router = useRouter()

  const [session, setSession] = useState<Session | null>()

  useEffect(() => {
    setSession(supabase.auth.session())

    const { data } = supabase.auth.onAuthStateChange((event, session) =>
      setSession(session)
    )

    return () => {
      data?.unsubscribe()
    }
  }, [])

  return (
    <header className="flex items-start justify-between p-4 lg:items-center lg:p-8">
      <Link href="/">
        <a className="flex items-center">
          <Logo size={32} />
          <span className="ml-4 text-xl font-semibold text-black">Pickle</span>
        </a>
      </Link>

      <nav className="flex flex-col items-end text-sm lg:text-base lg:flex-row lg:items-center">
        <NavLink href="/docs">Docs</NavLink>
        {session ? (
          <>
            <NavLink hero href="/dashboard">
              Dashboard
            </NavLink>
            <NavLink href="/profile">Profile</NavLink>
            <NavLink
              href="/sign-out"
              onClick={async () => {
                await supabase.auth.signOut()

                router.push('/')
              }}>
              Sign out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink hero href="/auth/sign-up">
              Get started
            </NavLink>
            <NavLink href="/auth/sign-in">Sign in</NavLink>
          </>
        )}
      </nav>
    </header>
  )
}
