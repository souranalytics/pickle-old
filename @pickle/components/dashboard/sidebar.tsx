import compact from 'lodash/compact'
import Link from 'next/link'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import React, { FunctionComponent, useState } from 'react'
import useSWR from 'swr'
import { twMerge } from 'tailwind-merge'

import { supabase } from '@pickle/lib/supabase/client'
import { AppsResponse, ProfileResponse } from '@pickle/types/api'
import { SideBarLinks } from '@pickle/types/components'

import { Icon, MenuIcon } from '../common/icon'
import { Logo } from '../common/logo'
import { Picker } from '../common/picker'

export const SideBar: FunctionComponent = () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <div
        className={twMerge(
          'fixed lg:hidden top-0 bottom-0 left-0 right-0 bg-black bg-opacity-75 opacity-0 pointer-events-none transition-opacity z-20',
          visible && 'pointer-events-auto opacity-100'
        )}
        onClick={() => setVisible(false)}
      />
      <button
        className="fixed z-40 p-3 text-white rounded-full bg-primary-600 lg:hidden bottom-4 right-4"
        onClick={() => setVisible(!visible)}>
        <MenuIcon open={visible} />
      </button>

      <aside
        className={twMerge(
          'fixed bg-white lg:static lg:translate-x-0 top-0 bottom-0 left-0 z-30 flex flex-col text-sm transition-transform transform right-1/4 lg:border-r lg:border-gray-200 lg:w-52',
          visible ? 'translate-x-0' : '-translate-x-full'
        )}>
        <Link href="/">
          <a className="flex items-center p-4">
            <Logo size={16} />
            <span className="ml-2 font-medium text-black">Pickle</span>
          </a>
        </Link>

        <AppPicker />

        <Links />

        <AuthCard />
      </aside>
    </>
  )
}

const AppPicker: FunctionComponent = () => {
  const router = useRouter()

  const { data } = useSWR<AppsResponse>('/apps')

  if (!data) {
    return <div className="m-3 text-gray-600">Loading</div>
  }

  const slug = String(router.query.app)

  return (
    <Picker
      className="m-3"
      data={[
        ...data.apps.map(({ name, slug }) => ({
          label: name,
          value: slug
        })),
        {
          label: 'New team',
          value: 'new'
        }
      ]}
      onChange={slug => {
        router.push(`/dashboard/${slug}`)

        if (slug !== 'new') {
          nookies.set(null, 'app', slug, {
            path: '/'
          })
        }
      }}
      placeholder="Switch team"
      value={slug}
    />
  )
}

const Links: FunctionComponent = () => {
  const router = useRouter()

  const slug = String(router.query.app)

  const links: SideBarLinks = [
    [
      {
        href: '',
        icon: 'chart',
        label: 'Dashboard'
      },
      {
        href: 'collaborators',
        icon: 'team',
        label: 'Collaborators'
      },
      {
        href: 'keys',
        icon: 'key',
        label: 'API keys'
      },
      {
        href: 'settings',
        icon: 'settings',
        label: 'Settings'
      }
    ],
    [
      {
        href: 'events',
        icon: 'calendar',
        label: 'Events'
      },
      {
        href: 'views',
        icon: 'devices',
        label: 'Views'
      },
      {
        href: 'users',
        icon: 'group',
        label: 'Users'
      }
    ]
  ]

  return (
    <>
      {links.map((links, index) => (
        <div className="mt-4" key={`section-${index}`}>
          {links.map(({ href, icon, label }, index) => {
            const [path] = router.asPath.split('?')

            const base = `/dashboard/${slug}`
            const url = compact([base, href]).join('/')

            return (
              <Link href={url} key={`item-${index}`}>
                <a
                  className={twMerge(
                    'flex items-center px-4 py-2 font-medium hover:bg-primary-50',
                    (href === '' ? path === url : path.startsWith(url))
                      ? 'text-primary-600 font-semibold'
                      : 'text-gray-600'
                  )}>
                  <Icon name={icon} size={16} />
                  <span className="ml-2">{label}</span>
                </a>
              </Link>
            )
          })}
        </div>
      ))}
    </>
  )
}

const AuthCard: FunctionComponent = () => {
  const router = useRouter()

  const { data } = useSWR<ProfileResponse>('/profile')

  return (
    <div className="flex flex-col py-4 mt-auto">
      <Link href="/docs">
        <a className="flex items-center px-4 py-2 font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50">
          <Icon name="documents" size={16} />
          <span className="ml-2">Docs</span>
        </a>
      </Link>

      {data ? (
        <Link href="/profile">
          <a className="flex items-center px-4 py-2 font-medium text-accent-600 hover:bg-accent-50">
            <Icon name="profile" size={16} />
            <span className="ml-2">{data?.profile?.name}</span>
          </a>
        </Link>
      ) : (
        <div className="px-4 py-2 text-gray-500">Loading</div>
      )}

      <button
        className="flex items-center px-4 py-2 font-medium text-left hover:bg-rose-50 text-rose-600"
        onClick={async () => {
          await supabase.auth.signOut()

          router.push('/')
        }}>
        <Icon name="exit" size={16} />
        <span className="ml-2">Sign out</span>
      </button>
    </div>
  )
}
