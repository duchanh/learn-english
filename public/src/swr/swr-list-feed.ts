import getFeedSuggest from '@/api/endpoint/feed/get-feed-suggest'
import qs from 'query-string'
import { Fetcher } from 'swr'
import useSWRInfinite from 'swr/infinite'

const path = `v1/article/search`

export interface ListFeedInfiniteParams {
  fingerprint: string
  category?: string
  location?: any
  page?: number
  limit?: number
}

export const useSWRListFeedInfinite = (data: ListFeedInfiniteParams) => {
  const fetcher: Fetcher<any> = async () => {
    const resultData = await getFeedSuggest(data)
    return resultData ? resultData?.results || [] : []
  }

  const getKey = (pageIndex: number) => {
    data.page = pageIndex + 1
    return [
      path,
      qs.stringify({
        ...data,
        page: pageIndex + 1
      })
    ]
  }

  const result = useSWRInfinite(getKey, fetcher, {
    revalidateAll: false,
    revalidateFirstPage: false,
    persistSize: false
  })

  return result
}
