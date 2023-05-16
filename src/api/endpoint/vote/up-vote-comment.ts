import REQUEST_METHOD from '@/constants/request-method'
import { createFetcher } from '@/api/utils/fetch-api'
import { InteractionFeed, VoteCommentParams } from 'Models'
import { MEEY_SHARE_API_URL } from '@/constants/environment'

const upVoteComment = async ({ commentId, fingerprint, token }: VoteCommentParams) => {
  const response = (await createFetcher)<InteractionFeed>(() => ({
    apiUrl: MEEY_SHARE_API_URL
  }))(
    REQUEST_METHOD.POST,
    `v1/interactions/comment/upvote/${commentId}?fingerprint=${fingerprint}`,
    null,
    {
      token
    }
  )
  return response || null
}

export default upVoteComment
