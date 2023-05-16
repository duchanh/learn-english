import { useOneSignal } from '@/hooks/useOneSignal'
import useSmartBanner from '@/hooks/useSmartBanner'
import React, { createContext } from 'react'

interface IOneSignalContext {
  initOneSignal: boolean
  oneSignal: any
}

export const OneSignalContext = createContext<IOneSignalContext>({
  initOneSignal: false,
  oneSignal: null
})

export function OneSignalContextProvider(props: any): JSX.Element {
  const { initOneSignal, oneSignal } = useOneSignal()
  return (
    <OneSignalContext.Provider value={{ initOneSignal, oneSignal }}>
      {props.children}
    </OneSignalContext.Provider>
  )
}
