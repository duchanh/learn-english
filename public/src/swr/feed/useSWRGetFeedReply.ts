import getComment from '@/api/endpoint/comment/get-comment'
import useSWR, { Fetcher } from 'swr'
import { SWR_FEED_COMMENT_REPLY } from '@/constants/swr-key'
import qs from 'query-string'

export const useSwrGetFeedReply = (data: any, token) => {
  const fetcher: Fetcher = async () => {
    const resultData: any = await getComment(data, token)
    return resultData
  }

  const getKey = (pageIndex: number) => {
    return `${SWR_FEED_COMMENT_REPLY}?${qs.stringify(data)}`
  }

  const result = useSWR(getKey, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
  return result
}
