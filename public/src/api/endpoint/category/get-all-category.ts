import { createFetcher } from '@/api/utils/fetch-api'
import { MEEY_SHARE_API_URL } from '@/constants/environment'
import { BaseDataListResponse, Feed } from 'Models'
import REQUEST_METHOD from '@/constants/request-method'

const getAllCategory = async () => {
  const response = await createFetcher<BaseDataListResponse<Feed>>(() => ({
    apiUrl: MEEY_SHARE_API_URL
  }))(REQUEST_METHOD.GET, `v1/categories/all`, null, {})
  return response || null
}

export default getAllCategory
