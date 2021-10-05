import { App } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { Options } from 'next-connect'
import { ZodSchema } from 'zod'

import { ApiError } from '@pickle/types/api'
import { User } from '@pickle/types/supabase'

import { apiError } from './error'
import { prisma } from './prisma'
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

export const getApp = async (req: NextApiRequest): Promise<App> => {
  const header = String(req.headers['x-pickle-key'])

  if (!header) {
    throw apiError(401, 'Missing API key')
  }

  const key = await prisma.key.findUnique({
    include: {
      app: true
    },
    where: {
      id: header
    }
  })

  if (!key) {
    throw apiError(401, 'Invalid API key')
  }

  return key.app
}

export const validateData = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data)

  if (!result.success) {
    throw apiError(400, result.error.message)
  }

  return result.data
}
