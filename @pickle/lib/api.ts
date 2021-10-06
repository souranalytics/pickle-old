import { NextApiRequest, NextApiResponse } from 'next'
import { Options } from 'next-connect'
import { ZodObject, ZodRawShape, ZodTypeAny } from 'zod'

import { ApiError } from '@pickle/types/api'
import { App, CollaboratorRole } from '@pickle/types/prisma'
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

export const getApp = async (
  user: User,
  slug: string,
  role?: CollaboratorRole
): Promise<App> => {
  const app = await prisma.app.findFirst({
    where: {
      collaborators: {
        some: {
          profile: {
            id: user.id
          },
          role
        }
      },
      slug
    }
  })

  if (!app) {
    throw apiError(404, 'App not found')
  }

  return app
}

export const getAppByKey = async (req: NextApiRequest): Promise<App> => {
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

export const validateData = <T>(
  schema: ZodObject<ZodRawShape, 'strip', ZodTypeAny, T>,
  data: unknown
): T => {
  const result = schema.safeParse(data)

  if (!result.success) {
    throw apiError(400, result.error.message)
  }

  return result.data
}
