import { AUTH_DATA } from '@/constants/key'
import { getCookie } from 'cookies-next'

export const getAuthContext = (context: any) => {
  if (!context) return null
  return getAuthRequest(context.req)
}

export const getAuthRequest = (req: any) => {
  if (!req) return null
  const cookieAuth = getCookie(AUTH_DATA, { req })?.toString()
  return cookieAuth ? JSON.parse(cookieAuth) : null
}
