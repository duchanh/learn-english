import REQUEST_METHOD from '@/constants/request-method'
import { createFetcher } from '@/api/utils/fetch-api'
import { InteractionFeed } from 'Models'
import { MEEY_SHARE_API_URL } from '@/constants/environment'

const getInteractionFeed = async (feedId: string, token: string) => {
  const response = await createFetcher<InteractionFeed>(() => ({
    apiUrl: MEEY_SHARE_API_URL
  }))(REQUEST_METHOD.GET, `v1/interactions/feed/${feedId}`, null, { token })
  return response || null
}

export default getInteractionFeed
