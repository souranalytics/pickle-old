import { useCallback, useState } from 'react'

import { supabase } from '@pickle/lib/supabase/client'

type Returns = {
  error?: string
  loading: boolean
  success?: string

  resetPassword: (email: string) => Promise<void>
}

export const useResetPassword = (): Returns => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()

  const resetPassword = useCallback(async (email: string) => {
    try {
      setLoading(true)
      setError(undefined)
      setSuccess(undefined)

      const { error } = await supabase.auth.api.resetPasswordForEmail(email)

      if (error) {
        throw error
      }

      setSuccess('Check your email for a password reset link')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    error,
    loading,
    resetPassword,
    success
  }
}
