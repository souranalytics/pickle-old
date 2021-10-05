import { NextApiHandler } from 'next'

import { supabase } from '@pickle/lib/supabase/server'

const handler: NextApiHandler = (req, res): void =>
  supabase.auth.api.setAuthCookie(req, res)

export default handler
