import { useRouter } from 'next/router'
import nookies from 'nookies'
import React, { FunctionComponent } from 'react'
import useSWR from 'swr'

import { AppsResponse } from '@pickle/types/api'

import { Picker } from '../common/picker'

export const AppPicker: FunctionComponent = () => {
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
