import {
  CalendarIcon,
  ChartPieIcon,
  DeviceMobileIcon,
  UserGroupIcon,
  UsersIcon
} from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent } from 'react'

import { AuthCard } from './auth'
import { AppPicker } from './picker'

export const SideBar: FunctionComponent = () => {
  const router = useRouter()

  const links = [
    [
      {
        href: '',
        icon: ChartPieIcon,
        label: 'Dashboard'
      },
      {
        href: 'collaborators',
        icon: UserGroupIcon,
        label: 'Collaborators'
      }
    ],
    [
      {
        href: 'events',
        icon: CalendarIcon,
        label: 'Events'
      },
      {
        href: 'screens',
        icon: DeviceMobileIcon,
        label: 'Screens'
      },
      {
        href: 'users',
        icon: UsersIcon,
        label: 'Users'
      }
    ]
  ]

  return (
    <aside className="flex flex-col text-sm bg-gray-100 w-52">
      <AppPicker />

      {links.map((links, index) => (
        <div className="mt-4" key={`section-${index}`}>
          {links.map((link, index) => (
            <Link
              href={`/dashboard/${router.query.app}/${link.href}`}
              key={`item-${index}`}>
              <a className="flex items-center px-4 py-2 font-medium text-gray-600 hover:bg-white">
                <link.icon className="w-4 h-4" />
                <span className="ml-2">{link.label}</span>
              </a>
            </Link>
          ))}
        </div>
      ))}

      <AuthCard className="mt-auto" />
    </aside>
  )
}
