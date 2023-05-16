import isEqual from 'lodash.isequal'
import { PAGE_INDEX, PAGE_SIZE_FEED, LIMIT_FEED_NEAR_YOU } from '@/constants/number'
import { useSWRGetFeedByCategory } from '@/swr/category/useSWRGetFeedByCategory'
import { useSWRListFeedInfinite } from '@/swr/swr-list-feed'
import FingerprintId from '@/utils/browserFingerprint'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import useTrackingScroll from '../tracking/useTrackingScroll'
import { AuthContext } from '@/context/auth.context'
import { Feed, FeedSuggestParams, InteractionFeed } from 'Models'
import useFeedStore from '@/store/feed-store'
import getInteractionFeeds from '@/api/endpoint/feed/get-interactions'
import useLocation from '../useLocation'
import getFeedSuggest from '@/api/endpoint/feed/get-feed-suggest'
import usePrevious from '../usePrevious'
import { useCategoryBySlug } from '../category/useCategory'
import useCommonStore from '@/store/common-store'

export const useFeedListing = <T>() => {
  const { token } = useContext(AuthContext)

  const { query } = useRouter()

  const { listMenuRef } = useTrackingScroll<T>()

  const isServer = typeof window === 'undefined'

  const fingerprint = isServer ? undefined : FingerprintId()

  const category = useCategoryBySlug(query.category)

  const { loadInteractionFeeds, loadFeedsNearYou, feedsNearYou, loadFeedsAdded, feedsAdded } = useFeedStore()
  const { setCurrentLocation } = useCommonStore()
  const {
    data: feeds,
    isValidating,
    size,
    setSize
  } = query.category
      ? useSWRGetFeedByCategory({
        category: query.category,
        params: {
          page: PAGE_INDEX,
          limit: PAGE_SIZE_FEED
        }
      })
      : useSWRListFeedInfinite({
        fingerprint: fingerprint?.toString(),
        ...(query.location &&
          !isServer && {
          locationId: query.location
        }),
        page: PAGE_INDEX,
        limit: PAGE_SIZE_FEED
      })

  const previewFeeds = usePrevious(feeds)

  const onLoadCountComment = async (feeds: Array<Array<Feed>>) => {
    if (feeds && feeds.length > 0) {
      const feedIds = feeds[feeds?.length - 1].map((feed) => feed._id)
      if (feedIds && feedIds.length > 0) {
        const interactionsFeed = await getInteractionFeeds(feedIds, token)
        loadInteractionFeeds(interactionsFeed?.results)
      }
    }
  }

  const { getPosition } = useLocation()
  const getFeedNearYou = async () => {
    if (navigator.geolocation) {
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
    if (!isValidating && feeds?.length > 0 && !isEqual(previewFeeds, feeds)) {
      onLoadCountComment(feeds)
    }
  }, [isValidating])

  const hasMore = feeds ? Boolean(feeds[feeds?.length - 1].length) : false
  const onLoadMore = () => {
    setSize(size + 1)
  }

  const result = feeds ? [].concat(...feeds) : []

  return {
    listMenuRef,
    isValidating,
    feeds: result,
    hasMore,
    onLoadMore,
    feedsNearYou,
    getFeedNearYou,
    loadFeedsAdded,
    feedsAdded
  }
}

export const useCountFeed = (feedId: string) => {
  const { interactionFeeds } = useFeedStore()
  const interactionFeed =
    feedId && interactionFeeds?.length > 0
      ? interactionFeeds?.find((count: InteractionFeed) => count.feed === `${feedId}`)
      : (null as unknown as InteractionFeed)

  return interactionFeed
}
