import { useState, useCallback, useEffect } from 'react'
import { getToken } from '@/extensions/cookie'
import { UserFromMeeyId } from 'Models'
import { setCookie, deleteCookie } from 'cookies-next'
import { AUTH_DATA } from '@/constants/key'

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState(null)
  const [user, setUser] = useState<UserFromMeeyId | null>()
  const [checked, setChecked] = useState<boolean>(false)
  const auth = getToken()

  const login = useCallback(() => {
    // @ts-ignore
    MeeyId && MeeyId.showLogin()
  }, [])

  const logout = useCallback(() => {
    // @ts-ignore
    MeeyId && MeeyId.signOut()
  }, [])

  const syncAuth = useCallback(() => {
    let authData = null
    if (auth) {
      if (auth.access_token) {
        authData = auth
      } else {
        // @ts-ignore
        const userMeeyId = MeeyId && MeeyId.getUser()
        if (userMeeyId) {
          authData = userMeeyId
        }
      }
    }

    if (authData) {
      saveUserToRedux(authData)
    } else {
      setAccessToken(null)
      deleteCookie('auth_c')
    }
    setChecked(true)
  }, [])

  const saveUserToRedux = async (authData: any) => {
    if (authData) {
      setAccessToken(authData.access_token)
      setUser(authData.user)
      setCookie(AUTH_DATA, JSON.stringify(auth))
    } else {
      setAccessToken(null)
      setUser(null)
      deleteCookie(AUTH_DATA)
    }
    setChecked(true)
  }

  useEffect(() => {
    syncAuth()
  }, [syncAuth])

  return { accessToken, user, login, logout, syncAuth, checked }
}
