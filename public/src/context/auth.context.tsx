import { createContext } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface IAuthContext {
  isLoggedIn: boolean
  user: any | null
  token: string | null
  login: any
  logout: any
}

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  user: null,
  token: null,
  login: () => {},
  logout: () => {}
})

export function AuthContextProvider(props: any): JSX.Element {
  const { user, accessToken, login, logout } = useAuth()
  const value: IAuthContext = {
    user,
    token: accessToken,
    isLoggedIn: !!accessToken,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}
