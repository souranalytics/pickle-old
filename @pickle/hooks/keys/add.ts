import { useCallback, useState } from 'react'

import { request } from '@pickle/lib/request'

type Returns = {
  loading: boolean
  error?: string

  addKey: (name: string) => Promise<void>
}

export const useAddKey = (slug: string): Returns => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const addKey = useCallback(
    async (name: string) => {
      try {
        setLoading(true)
        setError(undefined)

        await request(`/apps/${slug}/keys`, {
          data: {
            name
          },
          method: 'post'
        })
      } catch (error) {
        setError(error.error)
      } finally {
        setLoading(false)
      }
    },
    [slug]
  )

  return {
    addKey,
    error,
    loading
  }
}
