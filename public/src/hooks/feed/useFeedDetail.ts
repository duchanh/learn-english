import { DeviceContext } from '@/context/device.context'
import { FeedContext } from '@/context/feed.context'
import { castToArray } from '@/extensions/array'
import useFeedStore from '@/store/feed-store'
import isEqual from 'lodash.isequal'
import { Feed, InteractionFeed } from 'Models'
import { useContext, useEffect } from 'react'
import { useScrollCommentDetail } from '../comment/useScrollComment'
import useTrackingFeed from '../tracking/useTrackingFeed'
import usePrevious from '../usePrevious'
import { useFeed } from './useFeed'
import { useCountFeed } from './useFeedListing'
import { useVoteFeed } from './useVote'

export const useFeedDetail = (feed: Feed, interaction: InteractionFeed) => {
  const { feedCategory } = useFeed(feed)

  const { trackingUser } = useTrackingFeed()

  const previewInteraction = usePrevious(interaction)

  const { loadInteractionFeeds } = useFeedStore()

  useScrollCommentDetail()

  useEffect(() => {
    if (feed?.crawlId) {
      trackingUser(feed)
    }
  }, [feed])

  useEffect(() => {
    if (interaction && !isEqual(previewInteraction, interaction)) {
      loadInteractionFeeds(castToArray(interaction))
    }
  }, [interaction])

  return {
    feedCategory
  }
}

export const useFeedDetailVote = () => {
  const { isMobile } = useContext(DeviceContext)

  const { feed } = useContext(FeedContext)

  const interactionFeed = useCountFeed(feed?._id)

  const { isSubmitted, onUpVoteFeed, onDownVoteFeed } = useVoteFeed(feed)

  return {
    isSubmitted,
    isMobile,
    interactionFeed,
    feed,
    onUpVoteFeed,
    onDownVoteFeed
  }
}
