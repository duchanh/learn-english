import { createContext, useCallback, useEffect, useState } from 'react'

interface IDeviceContext {
  isMobile?: boolean
}

interface DeviceContextProviderProps extends IDeviceContext {
  children: React.ReactNode
}

export const DeviceContext = createContext<IDeviceContext>({
  isMobile: false
})

export function DeviceContextProvider(props: DeviceContextProviderProps): JSX.Element {
  const { children, isMobile: isMobileSSR } = props

  const [isMobile, setIsMobile] = useState(isMobileSSR)

  useEffect(() => {
    setIsMobile(isMobileSSR)
  }, [isMobileSSR])

  const handleResize = useCallback(() => {
    if (window.innerWidth < 992) {
      setIsMobile(true)
    } else setIsMobile(false)
  }, [])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return (
    <DeviceContext.Provider
      value={{
        isMobile
      }}
    >
      {children}
    </DeviceContext.Provider>
  )
}
