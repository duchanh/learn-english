import trackingFeed from '@/api/endpoint/tracking/tracking-feed'
import { TrackingSourceUserEnum } from '@/constants/enum/tracking.enum'
import { TRACKING_SOURCE_DETAIL } from '@/constants/number'
import { AuthContext } from '@/context/auth.context'
import { Feed } from 'Models'
import { useCallback, useContext, useRef } from 'react'
import FingerprintId from '@/utils/browserFingerprint'

const useTrackingFeed = (feed?: Feed, isDetail?: boolean) => {
  const { user } = useContext(AuthContext)
  const isTracked = useRef(false)
  const isServer = typeof window === 'undefined'
  const fingerprint = isServer ? undefined : FingerprintId()
  const postTrackUser = useCallback(
    async () => {
      console.log('isTracked', isTracked)
      // if (!isTracked.current)
      try {
        await trackingFeed({
          user: {
            source: TrackingSourceUserEnum.GUEST,
            fingerprint: fingerprint?.toString()
          },
          source: TRACKING_SOURCE_DETAIL,
          crawlId: feed?.crawlId
        })
        isTracked.current = true
      } catch (error) {}
    },
    isDetail ? [] : [feed?._id, feed?.categories, user]
  )

  const trackingUser = async (feedTracking) => {
    try {
      await trackingFeed({
        user: {
          source: TrackingSourceUserEnum.GUEST,
          fingerprint: fingerprint?.toString()
        },
        source: TRACKING_SOURCE_DETAIL,
        crawlId: feedTracking?.crawlId
      })
    } catch (error) {}
  }

  return {
    isTracked,
    postTrackUser,
    trackingUser
  }
}

export default useTrackingFeed
