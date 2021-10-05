import { NextApiRequest, NextApiResponse } from 'next'
import { Options } from 'next-connect'
import { ZodSchema } from 'zod'

import { ApiError } from '@pickle/types/api'
import { User } from '@pickle/types/supabase'

import { apiError } from './error'
import { supabase } from './supabase/server'

export const apiOptions: Options<NextApiRequest, NextApiResponse> = {
  onError(error: ApiError, req, res) {
    res.status(error.code ?? 500).json({
      error: error.message
    })
  }
}

export const getUser = async (req: NextApiRequest): Promise<User> => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    throw apiError(401, 'You need to be signed in')
  }

  return user
}

export const validateData = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data)

  if (!result.success) {
    throw apiError(400, result.error.message)
  }

  return result.data
}
