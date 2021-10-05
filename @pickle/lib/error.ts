import { ApiError } from '@pickle/types/api'

export const apiError = (code: number, message: string): ApiError => ({
  code,
  message
})
