import { BaseDataListResponse, UserMeeyId } from 'Base'

declare module 'Models' {
  type CommentStatus = 'error' | 'pending'

  type CommentType = 'text' | 'image' | 'link'

  export interface BaseCommentItem extends Omit<InteractionFeed, 'feed' | 'totalComments'> {
    channel: string
    replies?: string
    content: string
    contentType?: CommentType
    _id: string
    author: UserMeeyId
    totalReplied?: number
    totalLiked?: number
    totalDisliked?: number
    source?: string
    createdAt?: string
    createBy: string
    isLiked?: boolean
    isDisliked?: boolean
    status?: CommentStatus
  }
  export interface ICommentItem extends BaseCommentItem {
    replyComments?: ICommentItem[] = []
    lastReplyComment?: ICommentItem = null
    hasReplyComment?: boolean = false
    totalShowMoreComments?: number = 0
    isCreated?: boolean
  }

  export interface BaseCommentState {
    comments: ICommentItem[]
    lastComments: ICommentItem
    hasMore: boolean
    total: number
  }

  export interface ResultFetchDataComment extends BaseCommentState {}

  export interface ReplyCommentState extends BaseCommentState {
    commentId: string
    totalReplyComments: number
    totalShowMoreComments?: number
  }

  export interface CountCommentState {
    channel: string
    totalComment: number
  }
}
