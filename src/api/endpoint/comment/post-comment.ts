import { ICommentItem, PostCommentParams } from 'Models'
import { createFetcher } from '@/api/utils/fetch-api'
import { MEEY_SHARE_API_URL } from '@/constants/environment'
import REQUEST_METHOD from '@/constants/request-method'

const postComment = async ({ data, fingerprint, token }: PostCommentParams) => {
  const response = await createFetcher<ICommentItem>(() => ({
    apiUrl: MEEY_SHARE_API_URL
  }))(REQUEST_METHOD.POST, `v1/interactions/comment?fingerprint=${fingerprint}`, data, { token })
  return response || null
}

export default postComment
