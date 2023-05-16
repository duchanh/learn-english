import REQUEST_METHOD from '@/constants/request-method'
import { createFetcher } from '@/api/utils/fetch-api'
import { InteractionFeed, VoteParams } from 'Models'
import { MEEY_SHARE_API_URL } from '@/constants/environment'

const unVoteFeed = async ({ feedId, fingerprint, token }: VoteParams) => {
  const response = await createFetcher<InteractionFeed>(() => ({
    apiUrl: MEEY_SHARE_API_URL
  }))(REQUEST_METHOD.POST, `v1/interactions/unvote/${feedId}?fingerprint=${fingerprint}`, null, {
    token
  })
  return response || null
}

export default unVoteFeed
