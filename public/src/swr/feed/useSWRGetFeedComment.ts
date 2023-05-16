import getComment from '@/api/endpoint/comment/get-comment'
import useSWR, { Fetcher } from 'swr'
import { SWR_FEED_COMMENT } from '@/constants/swr-key'
import useSWRInfinite from 'swr/infinite'
import qs from 'query-string'
import {
  BaseDataListResponse,
  CountCommentParams,
  CountCommentState,
  ICommentItem,
  ListCommentParams
} from 'Models'
import getCountComment from '@/api/endpoint/comment/get-count-comment'

export const useSwrGetFeedComment = (data: ListCommentParams, token: string) => {
  const fetcher: Fetcher<BaseDataListResponse<ICommentItem>> = async () => {
    const resultData: any = await getComment(data, token)
    return resultData
  }

  const result = useSWR([SWR_FEED_COMMENT], fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
  return result
}

export const useSWRInfinityGetFeedComment = (data: ListCommentParams, token: string) => {
  const fetcher: Fetcher<BaseDataListResponse<ICommentItem>> = async () => {
    const result = await getComment(data, token)
    return result
  }

  const getKey = (pageIndex: number) => {
    const key = `${SWR_FEED_COMMENT}/${qs.stringify({
      ...data,
      page: pageIndex
    })}`
    return key
  }

  const result = useSWRInfinite(getKey, fetcher, {
    revalidateAll: false,
    revalidateFirstPage: true,
    persistSize: false
  })
  return result
}

export const useSwrGetFeedCountComment = (data: CountCommentParams, token: string) => {
  const fetcher: Fetcher<Array<CountCommentState>> = async () => {
    const resultData: any = await getCountComment(data, token)
    return resultData
  }

  const result = useSWR([SWR_FEED_COMMENT], fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
  return result
}
