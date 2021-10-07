import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent } from 'react'
import { twMerge } from 'tailwind-merge'

export const Footer: FunctionComponent = () => {
  const router = useRouter()

  const links = [
    {
      links: [
        {
          href: '/about',
          label: 'About'
        },
        {
          href: '/pricing',
          label: 'Pricing'
        },
        {
          href: '/docs',
          label: 'Docs'
        },
        {
          href: '/contact',
          label: 'Contact'
        }
      ],
      title: 'Pickle'
    },
    {
      links: [
        {
          href: '/help',
          label: 'Help'
        },
        {
          href: '/privacy',
          label: 'Privacy'
        },
        {
          href: '/terms',
          label: 'Terms'
        }
      ],
      title: 'Support'
    }
  ]

  return (
    <footer className="flex flex-col p-4 text-sm text-gray-600 lg:flex-row lg:justify-between lg:p-8">
      <div>&#169; {new Date().getFullYear()} / Pickle</div>

      <div className="grid grid-cols-2 gap-4 mt-4 lg:mt-0 lg:gap-8">
        {links.map(({ links, title }) => (
          <nav className="flex flex-col" key={title}>
            <h4 className="font-medium text-gray-800">{title}</h4>

            {links.map(({ href, label }) => (
              <Link href={href} key={href}>
                <a
                  className={twMerge(
                    'mt-1 text-gray-600 hover:text-accent-600',
                    router.asPath == href && 'font-medium'
                  )}>
                  {label}
                </a>
              </Link>
            ))}
          </nav>
        ))}
      </div>
    </footer>
  )
}
