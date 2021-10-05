import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { supabase } from '@pickle/lib/supabase/client'
import { Session } from '@pickle/types/supabase'

import { Logo } from './logo'
import { NavLink } from './nav-link'

type Props = {
  className?: string
}

export const Header: FunctionComponent<Props> = ({ className }) => {
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
    <header
      className={twMerge(
        'flex items-start lg:items-center justify-between m-4 lg:m-8',
        className
      )}>
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
