import { createFetcher } from '@/api/utils/fetch-api'
import { MEEY_SHARE_API_URL } from '@/constants/environment'
import { Feed } from 'Models'
import REQUEST_METHOD from '@/constants/request-method'

const getFeedDetail = async (id: string, token?: string) => {
  const response = await createFetcher<Feed>(() => ({
    apiUrl: MEEY_SHARE_API_URL
  }))(REQUEST_METHOD.GET, `v1/feeds/${id}`, null, { token })
  return response || null
}

export default getFeedDetail
