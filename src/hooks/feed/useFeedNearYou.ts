import { useEffect } from 'react'
import useLocation from '../useLocation'
import useFeedStore from '@/store/feed-store'
import FingerprintId from '@/utils/browserFingerprint'
import { LIMIT_FEED_NEAR_YOU } from '@/constants/number'
import { FeedSuggestParams } from 'Models'
import { useCategoryBySlug } from '../category/useCategory'
import { useRouter } from 'next/router'
import getFeedSuggest from '@/api/endpoint/feed/get-feed-suggest'
import useCommonStore from '@/store/common-store'
import { DeviceContext } from '@/context/device.context'
import { useContext } from 'react'

const useFeedNearYou = () => {
  const { loadFeedsNearYou, feedsNearYou } = useFeedStore()
  const {isMobile} = useContext(DeviceContext)
  const isServer = typeof window === 'undefined'
  const fingerprint = isServer ? undefined : FingerprintId()
  const { query } = useRouter()
  const category = useCategoryBySlug(query.category)
  const { setCurrentLocation } = useCommonStore()

  const { getPosition } = useLocation()
  const checkGeoPermission = () => {
    if (!isServer && navigator?.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === "granted") {
          getFeedNearYou()
        }

        if (isMobile && result.state === "prompt") {
          getFeedNearYou()
        }
      })
    }
  }
  const getFeedNearYou = async () => {
    if (!isServer && navigator?.geolocation) {
      const position = await getPosition(false)
      if (position?.coords) {
        const { coords } = position
        const payload = {
          fingerprint: fingerprint?.toString(),
          location: {
            lat: coords?.latitude,
            lng: coords?.longitude
          },
          page: 1,
          limit: LIMIT_FEED_NEAR_YOU,
          category: category?._id || undefined,
          interaction: true
        } as FeedSuggestParams
        const data = await getFeedSuggest(payload)
        loadFeedsNearYou(data?.results ?? [])
        setCurrentLocation(data?.citiesFilter?.[0] || '')
      }
    }
  }

  useEffect(() => {
    checkGeoPermission()
    return () => {
      loadFeedsNearYou([])
    }
  }, [category])

  return {
    feedsNearYou,
    getFeedNearYou
  }
}

export default useFeedNearYou
