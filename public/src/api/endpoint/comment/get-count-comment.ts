import { createFetcher } from '@/api/utils/fetch-api'
import { MEDIA_API_URL } from '@/constants/environment'
import REQUEST_METHOD from '@/constants/request-method'
import { CountCommentParams, CountCommentState } from 'Models'
import qs from 'query-string'

const getCountComment = async (params: CountCommentParams, token?: string) => {
  const response = await createFetcher<Array<CountCommentState>>(() => ({
    apiUrl: MEDIA_API_URL
  }))(REQUEST_METHOD.GET, `v1/comment/count?${qs.stringify(params)}`, null, { token })
  return response || null
}

export default getCountComment
