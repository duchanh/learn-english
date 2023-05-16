declare module 'Models' {
  interface UserSourceParams {
    source: string
    fingerprint: string
  }

  export interface BaseParams {
    fingerprint?: string
    token?: string
  }

  interface FeedSuggestParams extends BaseGetQuery {
    fingerprint: string
    interaction?: boolean
  }

  export interface TrackingParams {
    categories: string | string[]
    user: {
      source: string
      fingerprint: string
    }
    feed: string
    source: string
  }

  export interface ListCommentParams extends BaseGetQuery {
    channel: string
    isCount?: boolean
    replies?: string
    oldestCommentId?: string
    newestCommentId?: string
    order?: OrderEnum
  }

  export interface CountCommentParams {
    channel: string
    channels: string
    replies?: string
  }

  export interface VoteParams extends BaseParams {
    feedId: string
  }

  export interface VoteCommentParams extends BaseParams {
    commentId: string
  }

  export interface IPostComment {
    content: string | number
    channel: string
    replies?: string
  }
  export interface PostCommentParams extends BaseParams {
    data: IPostComment
  }

  export interface PostContentParams {
    category?: string
    comment: string
    link?: string
  }

}
