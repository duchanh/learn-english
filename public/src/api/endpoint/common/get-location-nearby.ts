import { createFetcher } from '@/api/utils/fetch-api'
import { MEEY_SHARE_API_URL } from '@/constants/environment'
import REQUEST_METHOD from '@/constants/request-method'

const getLocationNearby = async (data: any) => {
  const response = await createFetcher(() => ({
    apiUrl: MEEY_SHARE_API_URL
  }))(REQUEST_METHOD.POST, `v1/cities/detail`, data, {})
  return response || null
}

export default getLocationNearby
