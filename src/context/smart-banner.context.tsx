import useSmartBanner from '@/hooks/useSmartBanner'
import React, { createContext } from 'react'

interface ISmartBannerContext {
  showBanner: boolean
  onRemoveBanner: () => void
}

export const SmartBannerContext = createContext<ISmartBannerContext>({
  showBanner: false,
  onRemoveBanner: () => {}
})

export function SmartBannerContextProvider(props: any): JSX.Element {
  const { onRemoveBanner, showBanner } = useSmartBanner()
  return (
    <SmartBannerContext.Provider value={{ showBanner, onRemoveBanner }}>
      {props.children}
    </SmartBannerContext.Provider>
  )
}
