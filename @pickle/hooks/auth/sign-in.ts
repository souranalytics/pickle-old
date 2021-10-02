import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

import { supabase } from '@pickle/lib/supabase/client'

type Returns = {
  loading: boolean
  error?: string

  signUp: (email: string, password: string) => Promise<void>
}

export const useSignIn = (): Returns => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const signUp = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true)
        setError(undefined)

        const { error } = await supabase.auth.signIn({
          email,
          password
        })

        if (error) {
          throw error
        }

        router.push('/apps')
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    },
    [router]
  )

  return {
    error,
    loading,
    signUp
  }
}
