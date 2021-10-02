import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@pickle/lib/supabase/server'

const handler = (req: NextApiRequest, res: NextApiResponse): void =>
  supabase.auth.api.setAuthCookie(req, res)

export default handler
