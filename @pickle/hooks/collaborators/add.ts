import { useCallback, useState } from 'react'

import { request } from '@pickle/lib/request'

type Returns = {
  loading: boolean
  error?: string

  addCollaborator: (email: string) => Promise<void>
}

export const useAddCollaborator = (slug: string): Returns => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const addCollaborator = useCallback(
    async (email: string) => {
      try {
        setLoading(true)
        setError(undefined)

        await request(`/apps/${slug}/collaborators`, {
          data: {
            email
          },
          method: 'post'
        })
      } catch (error) {
        console.log('error', error)

        setError(error.error)
      } finally {
        setLoading(false)
      }
    },
    [slug]
  )

  return {
    addCollaborator,
    error,
    loading
  }
}
