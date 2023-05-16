import { createFetcher } from '@/api/utils/fetch-api'
import { MEEY_SHARE_API_URL } from '@/constants/environment'
import { FeedOGP } from 'Models'
import REQUEST_METHOD from '@/constants/request-method'

const getFeedOGP = async (url: string) => {
  const response = await createFetcher<FeedOGP>(() => ({
    apiUrl: MEEY_SHARE_API_URL
  }))(REQUEST_METHOD.POST, `v1/feeds/url/info`, { link: url }, {})
  return response || null
}

export default getFeedOGP
