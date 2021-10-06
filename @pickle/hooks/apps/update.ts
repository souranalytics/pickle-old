import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

import { request } from '@pickle/lib/request'
import { AppResponse } from '@pickle/types/api'

type Returns = {
  loading: boolean
  error?: string

  updateApp: (name: string, planId: string) => Promise<void>
}

export const useUpdateApp = (slug: string): Returns => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const updateApp = useCallback(
    async (name: string, planId: string) => {
      try {
        setLoading(true)
        setError(undefined)

        const { app } = await request<AppResponse>(`/apps/${slug}`, {
          data: {
            name,
            planId
          },
          method: 'put'
        })

        router.push(`/dashboard/${app.slug}/settings`)
      } catch (error) {
        setError(error.error)
      } finally {
        setLoading(false)
      }
    },
    [router, slug]
  )

  return {
    error,
    loading,
    updateApp
  }
}
