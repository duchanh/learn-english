import { AuthContext } from '@/context/auth.context'
import { useContext } from 'react'

export type ClickHandler = (data?: any, event?: React.BaseSyntheticEvent) => any

export type UseHandleClick = <_>(onClick: ClickHandler) => (e?: React.BaseSyntheticEvent) => any

export const useProtected = () => {
  const { isLoggedIn, login } = useContext(AuthContext)

  const onAction: UseHandleClick = (onClick) => (e) => {
    e?.stopPropagation()
    e?.preventDefault()
    if (!isLoggedIn) {
      login()
    } else {
      onClick(e)
    }
  }

  return onAction
}
