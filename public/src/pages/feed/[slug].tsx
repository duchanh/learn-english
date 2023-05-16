import FeedDetail from '@/modules/FeedDetail/FeedDetail'
import { GetServerSidePropsContext } from 'next'
import { getFeedDetailSSRProps } from '@/fetch-data/feed-detail-props'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await getFeedDetailSSRProps(context)
}

export default FeedDetail
