import { UserCircleIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent } from 'react'
import useSWR from 'swr'
import { twMerge } from 'tailwind-merge'

import { supabase } from '@pickle/lib/supabase/client'
import { ProfileResponse } from '@pickle/types/api'

type Props = {
  className?: string
}

export const AuthCard: FunctionComponent<Props> = ({ className }) => {
  const router = useRouter()

  const { data } = useSWR<ProfileResponse>('/profile')

  return (
    <div className={twMerge('flex flex-col py-4', className)}>
      {data ? (
        <Link href="/profile">
          <a className="flex items-center px-4 py-2 font-medium hover:bg-white">
            <UserCircleIcon className="w-4 h-4" />
            <span className="ml-2">{data?.profile?.name}</span>
          </a>
        </Link>
      ) : (
        <div className="px-4 py-2 text-gray-500">Loading</div>
      )}

      <button
        className="px-4 py-2 font-medium text-left hover:bg-white text-rose-600"
        onClick={async () => {
          await supabase.auth.signOut()

          router.push('/')
        }}>
        Sign out
      </button>
    </div>
  )
}
