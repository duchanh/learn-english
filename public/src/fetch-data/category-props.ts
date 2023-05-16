import { GetServerSidePropsContext } from 'next'
import getFeedSeoList from '@/api/endpoint/feed/get-feed-seo-list'

export async function getHomeSSRProps(context: GetServerSidePropsContext) {
  try {
    const response = await getFeedSeoList()
    const feedsSeoList = response.results
    return {
      props: {
        feedsSeoList: feedsSeoList
      }
    }
  } catch {
    return {
      props: {}
    }
  }
}
