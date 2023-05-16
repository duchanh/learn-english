import { createFetcher } from '@/api/utils/fetch-api'
import { MEEY_SHARE_API_URL } from '@/constants/environment'
import REQUEST_METHOD from '@/constants/request-method'
import { Feed, PostContentParams } from 'Models'

const createFeed = async (payload: PostContentParams, token) => {
  const response: Feed = await createFetcher<Feed>(() => ({
    apiUrl: MEEY_SHARE_API_URL
  }))(REQUEST_METHOD.POST, `v1//feeds`, payload, { token })
  return response || null
}

export default createFeed
