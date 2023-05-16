import { ONE_SIGNAL_APP_ID } from '@/constants/environment'
import { useEffect, useState } from 'react'
import OneSignal from 'react-onesignal'
import FingerprintId from '@/utils/browserFingerprint'

export const useOneSignal = () => {
  const [initOneSignal, setInitOnesignal] = useState(false)

  const isServer = typeof window === 'undefined'

  useEffect(() => {
    if (ONE_SIGNAL_APP_ID && !isServer) {
      OneSignal?.init({ appId: ONE_SIGNAL_APP_ID, allowLocalhostAsSecureOrigin: true }).then(() => {
        OneSignal?.showSlidedownPrompt().then(() => {
          setInitOnesignal(true)
        })
      })
    }
  }, [])

  useEffect(() => {
    if (initOneSignal && OneSignal) {
      const fingerprint = FingerprintId()
      OneSignal?.setExternalUserId(fingerprint)
    }
  }, [initOneSignal])

  return {
    initOneSignal,
    oneSignal: OneSignal
  }
}
