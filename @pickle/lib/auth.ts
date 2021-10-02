import { IncomingMessage } from 'http'

import { User } from '@pickle/types/supabase'

import { supabase } from './supabase/server'

export const getUser = async (req: IncomingMessage): Promise<User | null> => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  return user
}
