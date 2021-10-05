import { useCallback, useState } from 'react'

import { request } from '@pickle/lib/request'
import { supabase } from '@pickle/lib/supabase/client'

type Returns = {
  error?: string
  loading: boolean
  success?: string

  signUp: (name: string, email: string, password: string) => Promise<void>
}

export const useSignUp = (): Returns => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        setLoading(true)
        setError(undefined)
        setSuccess(undefined)

        const { error, user } = await supabase.auth.signUp({
          email,
          password
        })

        await request('/auth/sign-up', {
          data: {
            email,
            id: user?.id,
            name
          },
          method: 'post'
        })

        if (error) {
          throw error
        }

        setSuccess('Check your email for a confirmation link')
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return {
    error,
    loading,
    signUp,
    success
  }
}
