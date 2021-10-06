import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

import { request } from '@pickle/lib/request'
import { AppResponse } from '@pickle/types/api'

type Returns = {
  loading: boolean
  error?: string

  createApp: (name: string, planId: string) => Promise<void>
}

export const useCreateApp = (): Returns => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const createApp = useCallback(
    async (name: string, planId: string) => {
      try {
        setLoading(true)
        setError(undefined)

        const { app } = await request<AppResponse>('/apps', {
          data: {
            name,
            planId
          },
          method: 'post'
        })

        router.push(`/dashboard/${app.slug}`)
      } catch (error) {
        setError(error.error)
      } finally {
        setLoading(false)
      }
    },
    [router]
  )

  return {
    createApp,
    error,
    loading
  }
}
