import getInteractionFeed from '@/api/endpoint/feed/get-feed-interaction'
import getFeedDetail from '@/api/endpoint/feed/get-feed-detail'
import { getAuthContext } from '@/utils/user'
import { GetServerSidePropsContext } from 'next'
import { REDIRECT_PAGE_NOT_FOUND } from '@/constants/redirect'

export async function getFeedDetailSSRProps(context: GetServerSidePropsContext) {
  const { params } = context
  const { slug } = params || {}
  const auth = getAuthContext(context)
  try {
    if (!slug) {
      return {
        redirect: REDIRECT_PAGE_NOT_FOUND
      }
    }
    const feed = await getFeedDetail(slug as string, auth?.access_token)

    if (!feed) {
      return {
        redirect: REDIRECT_PAGE_NOT_FOUND
      }
    }
    const interactionFeed = await getInteractionFeed(feed._id, auth?.access_token)

    return {
      props: {
        feed,
        interactionFeed
      }
    }
  } catch (error) {
    return {
      redirect: REDIRECT_PAGE_NOT_FOUND
    }
  }
}
