import { createFetcher } from '@/api/utils/fetch-api'
import { MEEY_SHARE_API_URL } from '@/constants/environment'
import { BaseDataListResponse, Feed } from 'Models'
import REQUEST_METHOD from '@/constants/request-method'

const getFeedByCategory = async (data: any) => {
  const response = await createFetcher<BaseDataListResponse<Feed>>(() => ({
    apiUrl: MEEY_SHARE_API_URL
  }))(REQUEST_METHOD.POST, `v1/feeds/category/${data.category}`, data.params, {})
  return response || null
}

export default getFeedByCategory
