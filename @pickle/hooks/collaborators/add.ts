import { useCallback, useState } from 'react'

import { request } from '@pickle/lib/request'

type Returns = {
  loading: boolean
  error?: string

  addCollaborator: (email: string) => Promise<boolean>
}

export const useAddCollaborator = (slug: string): Returns => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const addCollaborator = useCallback(
    async (email: string) => {
      try {
        setLoading(true)
        setError(undefined)

        await request('/collaborators', {
          data: {
            email
          },
          method: 'post',
          params: {
            slug
          }
        })

        return true
      } catch (error) {
        setError(error.error)

        return false
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
