declare module 'Models' {
  export interface BaseItem {
    _id: string
    name: string
  }
  export interface BaseItemResponse {
    _id: string
  }

  export interface BaseResultListResponse<T> {
    results?: Array<T>
  }

  export interface BaseDataList<T extends BaseItem> {
    dataList?: Array<T>
    page?: number
    limit?: number
    totalPages?: number
    totalResults?: number
    skip?: number
    shortIds?: Array<string>
  }
  export interface BaseDataListResponse<T extends BaseItemResponse>
    extends BaseResultListResponse<T> {
    page?: number
    limit?: number
    totalPages?: number
    totalResults?: number
    citiesFilter?: Array<string>
  }

  export interface BaseGetQuery {
    page?: number
    limit?: number
  }
  export interface SWRResponse<T> {
    data?: T
    error?: any
    mutate?: any
    isValidating?: boolean
  }

  export interface IFilterProps {
    category?: Category
    params?: any
    location?: any
  }
}
