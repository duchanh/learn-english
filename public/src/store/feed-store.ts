import { castToArray, mergeArray } from '@/extensions/array'
import { replaceItem } from '@/extensions/array'
import produce from 'immer'
import { CountCommentState, InteractionFeed, Feed, PostCommentParams, PostContentParams } from 'Models'
import { create } from 'zustand'
import { initInteraction, onLoadStyleInteractionFeed } from '@/extensions/feed'

type FeedState = {
  countComments: CountCommentState[]
  interactionFeeds: InteractionFeed[]
  loadCountComments: (countComments: CountCommentState[]) => void
  reloadInteractionFeed: (interactionFeed: InteractionFeed) => void
  loadInteractionFeeds: (interactionFeeds: InteractionFeed[]) => void
  feedsNearYou: Feed[]
  feedsAdded: Feed[]
  loadFeedsNearYou: (feeds: Feed[]) => void
  loadFeedsAdded: (feed: Feed) => void
  addCommentCount: (feedId: string) => void
}

const initState = {
  countComments: [],
  interactionFeeds: [],
  feedsNearYou: [],
  feedsAdded: []
}

const initInteractionFeeds = (interactionFeeds: InteractionFeed[]) => {
  if (!interactionFeeds || interactionFeeds.length === 0) return []
  return interactionFeeds.map((interactionFeed: InteractionFeed) => {
    return {
      ...interactionFeed,
      styles: onLoadStyleInteractionFeed(interactionFeed)
    }
  })
}

const useFeedStore = create<FeedState>((set, get) => ({
  ...initState,
  loadCountComments: (countCommentState: CountCommentState[]) => {
    return set(
      produce((state) => {
        state.countComments = countCommentState
      })
    )
  },
  reloadInteractionFeed: (interactionFeed: InteractionFeed) => {
    const { interactionFeeds } = get()
    const interactionFeedStore = replaceItem(
      interactionFeeds ?? [],
      {
        ...interactionFeed,
        styles: onLoadStyleInteractionFeed(interactionFeed)
      },
      'feed'
    )
    return set(
      produce((state) => {
        state.interactionFeeds = interactionFeedStore
      })
    )
  },
  loadInteractionFeeds: (interactionFeeds: InteractionFeed[]) => {
    const { interactionFeeds: currentInteractionFeeds } = get()
    const initInteractionFeed = initInteractionFeeds(interactionFeeds)

    const interactionFeedStore = mergeArray(initInteractionFeed, currentInteractionFeeds, 'feed')
    return set(
      produce((state) => {
        state.interactionFeeds = interactionFeedStore
      })
    )
  },
  loadFeedsNearYou: (feeds: Feed[]) => {
    const { interactionFeeds: currentInteractionFeeds = [] } = get()
    let initInteractionFeed = []
    feeds?.map((i) => {
      if (i.interaction) initInteractionFeed.push(i.interaction)
    })
    const interactionFeedStore = mergeArray(initInteractionFeed, currentInteractionFeeds, 'feed')
    return set(
      produce((state) => {
        state.feedsNearYou = feeds
        state.interactionFeeds = interactionFeedStore
      })
    )
  },
  loadFeedsAdded: (feed: Feed) => {
    const { interactionFeeds: currentInteractionFeeds = [] } = get()

    const initInteractionFeed = initInteraction(feed._id)
    const initInteractionFeedState = mergeArray(castToArray(initInteractionFeed), currentInteractionFeeds, 'feed')

    return set(
      produce((state) => {
        state.feedsAdded = [feed, ...state.feedsAdded]
        state.interactionFeeds = initInteractionFeedState
      })
    )
  },
  addCommentCount: (feedId: string) => {
    const { interactionFeeds: currentInteractionFeeds } = get()

    const interactionFeed = currentInteractionFeeds?.find((i) => i.feed === feedId)
    if (interactionFeed) {
      const interactionFeedStore = replaceItem(
        currentInteractionFeeds,
        {
          ...interactionFeed,
          totalComments: interactionFeed.totalComments + 1
        },
        'feed'
      )

      return set(
        produce((state) => {
          state.interactionFeeds = interactionFeedStore
        })
      )
    }
  },
}))

export default useFeedStore
