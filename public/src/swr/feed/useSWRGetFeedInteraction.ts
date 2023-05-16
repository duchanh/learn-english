import getInteractionFeed from '@/api/endpoint/feed/get-feed-interaction'
import { SWR_FEED_INTERACTION } from '@/constants/swr-key'
import { InteractionFeed } from 'Models'
import useSWR, { Fetcher } from 'swr'

export const useSwrGetFeedInteraction = (feedId: string, token: string) => {
  const fetcher: Fetcher<InteractionFeed> = async () => {
    const resultData: any = await getInteractionFeed(feedId, token)
    return resultData
  }

  const result = useSWR(feedId ? [SWR_FEED_INTERACTION, feedId, token] : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
  return result
}
