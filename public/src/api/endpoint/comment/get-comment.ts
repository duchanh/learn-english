import { createFetcher } from '@/api/utils/fetch-api'
import { MEEY_SHARE_API_URL } from '@/constants/environment'
import REQUEST_METHOD from '@/constants/request-method'
import { BaseDataListResponse, ICommentItem, ListCommentParams } from 'Models'
import qs from 'query-string'

const getComment = async (params: ListCommentParams, token: string) => {
  const response = await createFetcher<BaseDataListResponse<ICommentItem>>(() => ({
    apiUrl: MEEY_SHARE_API_URL
  }))(REQUEST_METHOD.GET, `v1/interactions/comments?${qs.stringify(params)}`, null, { token })
  return response || null
}

export default getComment
