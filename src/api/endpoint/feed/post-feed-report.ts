import { createFetcher } from '@/api/utils/fetch-api'
import { MEEY_SHARE_API_URL } from '@/constants/environment'
import REQUEST_METHOD from '@/constants/request-method'

const postReportFeed = async (payload: any, token) => {
  const response = await createFetcher(() => ({
    apiUrl: MEEY_SHARE_API_URL
  }))(REQUEST_METHOD.POST, `v1/report/feed`, payload, { token })
  return response || null
}

export default postReportFeed
