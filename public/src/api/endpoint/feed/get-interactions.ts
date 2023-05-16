import REQUEST_METHOD from '@/constants/request-method'
import { createFetcher } from '@/api/utils/fetch-api'
import { BaseResultListResponse, InteractionFeed } from 'Models'
import { MEEY_SHARE_API_URL } from '@/constants/environment'

const getInteractionFeeds = async (feeds: Array<string>, token: string) => {
  const response = await createFetcher<BaseResultListResponse<InteractionFeed>>(() => ({
    apiUrl: MEEY_SHARE_API_URL
  }))(REQUEST_METHOD.POST, `v1/interactions/feeds`, { feeds }, { token })
  return response || null
}

export default getInteractionFeeds
