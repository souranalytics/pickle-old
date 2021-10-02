import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
}

export const Footer: FunctionComponent<Props> = ({ className }) => {
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
    <footer
      className={twMerge(
        'flex flex-col lg:flex-row lg:justify-between text-sm text-gray-600 m-4 lg:m-8',
        className
      )}>
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
