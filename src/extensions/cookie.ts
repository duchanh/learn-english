import * as key from '@/constants/key'
import Cookies, { CookieAttributes } from 'js-cookie'

export const getCookie = (key: string) => {
  try {
    const cookie = Cookies.get(key)
    return cookie ? JSON.parse(cookie) : null
  } catch (error) {
    return null
  }
}

export const setCookie = (name: string, token?: any, options?: CookieAttributes) => {
  if (!token) {
    Cookies.remove(name)
  } else {
    Cookies.set(name, JSON.stringify(token), options ?? { expires: 60 * 60 * 24 * 30 })
  }
}

export const getToken = () => getCookie(key.AUTH_TOKEN)
export const setToken = (token?: any, options?: CookieAttributes) => {
  setCookie(key.AUTH_TOKEN, token, options)
}
