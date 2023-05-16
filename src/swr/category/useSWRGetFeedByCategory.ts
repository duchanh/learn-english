import getFeedByCategory from '@/api/endpoint/feed/get-feed-by-category'
import { Fetcher } from 'swr'
import useSWRInfinite from 'swr/infinite'
export interface ListFeedInfiniteParams {
  user: {
    source: string
    value: string
  }
  category?: string
  location?: any
  page?: number
  limit?: number
}

export const useSWRGetFeedByCategory = (data: any) => {
  const fetcher: Fetcher<any> = async () => {
    const resultData = await getFeedByCategory(data)
    return resultData ? resultData?.results || [] : []
  }

  const getKey = (pageIndex: number) => {
    data.params.page = pageIndex + 1
    const key = `v1/feeds/category/${data.category}?page=${pageIndex + 1}`
    return key
  }

  const result = useSWRInfinite(getKey, fetcher, {
    revalidateAll: false,
    revalidateFirstPage: false,
    persistSize: false
  })

  return result
}
