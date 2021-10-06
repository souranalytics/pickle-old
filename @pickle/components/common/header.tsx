import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { supabase } from '@pickle/lib/supabase/client'
import { Session } from '@pickle/types/supabase'

import { MenuIcon } from './icon'
import { Logo } from './logo'
import { NavLink } from './nav-link'

export const Header: FunctionComponent = () => {
  const router = useRouter()

  const [session, setSession] = useState<Session | null>()
  const [visible, setVisible] = useState(false)

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
          <span className="ml-4 text-xl font-semibold text-black lowercase">
            Pickle
          </span>
        </a>
      </Link>

      <button
        className={twMerge(
          'top-0 right-0 z-20 p-4 lg:hidden',
          visible ? 'fixed' : 'absolute'
        )}
        onClick={() => setVisible(!visible)}>
        <MenuIcon open={visible} />
      </button>

      <nav
        className={twMerge(
          'fixed top-0 bottom-0 left-0 right-0 z-10 flex flex-col items-center justify-center bg-white bg-opacity-95 lg:text-base lg:flex-row lg:items-center transition-opacity lg:static lg:opacity-100 lg:pointer-events-auto',
          visible
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}>
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
