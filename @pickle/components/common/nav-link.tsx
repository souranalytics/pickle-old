import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  href: string
  hero?: boolean

  onClick?: () => void
}

export const NavLink: FunctionComponent<Props> = ({
  children,
  hero,
  href,
  onClick
}) => {
  const router = useRouter()

  return (
    <Link href={href}>
      <a
        className={twMerge(
          'py-2 mt-2 first:mt-0 lg:mt-0 lg:ml-4 lg:first:ml-0 rounded-full',
          hero
            ? 'font-semibold px-4 bg-primary-600 hover:bg-accent-600 text-white hover:text-white'
            : 'font-medium px-3 hover:bg-primary-100 text-black hover:text-black',
          router.asPath === href && (hero ? 'bg-accent-600' : 'bg-primary-200')
        )}
        onClick={event => {
          if (onClick) {
            event.preventDefault()

            onClick()
          }
        }}>
        {children}
      </a>
    </Link>
  )
}
