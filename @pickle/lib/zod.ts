import { z } from 'zod'

const json = z.union([z.string(), z.number(), z.null(), z.boolean()])

export const zodJson = z.record(z.union([json, z.record(json)]))
