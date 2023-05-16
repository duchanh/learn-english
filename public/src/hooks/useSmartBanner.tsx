import { SMART_BANNER_CLOSE } from '@/constants/key'
import { setCookie, getCookie } from 'cookies-next'
import { useCallback, useEffect, useState } from 'react'

const useSmartBanner = () => {
  const closed = getCookie(SMART_BANNER_CLOSE)

  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    setShowBanner(!closed)
  }, [closed])

  const onRemoveBanner = useCallback(() => {
    setShowBanner(false)
    setCookie(SMART_BANNER_CLOSE, true)
  }, [])

  return {
    showBanner,
    onRemoveBanner
  }
}

export default useSmartBanner
