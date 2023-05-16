import { mergeArray, replaceItem, replaceItemWithCondition } from '@/extensions/array'
import produce from 'immer'
import { create } from 'zustand'
import { deepClone } from '@/extensions/object'
import { ICommentItem, InteractionFeed, ResultFetchDataComment } from 'Models'
import orderBy from 'lodash.orderby'
type CommentState = {
  scrollToComment?: boolean
  comments: ICommentItem[]
  total: number
  oldestCommentId?: string
  hasMore?: boolean
  loading: boolean
  submitComment?: boolean
  addComment: (comment: ICommentItem) => void
  replaceComment: (commentId: string, comment: ICommentItem, merge?: boolean) => void
  replaceReplyComment: (input: any) => void
  setLoadingComment: (loading: boolean) => void
  resetCommentStore: () => void
  loadComments: (data: ResultFetchDataComment) => void
  loadMoreComment: (data: ResultFetchDataComment) => void
  loadReplyComment: (comment: ICommentItem, data: ResultFetchDataComment) => void
  loadMoreReplyComment: (commentId: string, data: ResultFetchDataComment) => void
  addReplyComment: (commentId: string, comment: ICommentItem) => void
  removeComment: (commentId: string) => void
  setScrollToComment: (scrollToComment: boolean) => void
  updateVoteComment: (e?: any) => void
  updateVoteReplyComment: (e?: any) => void
}

const addComments = (comments: any, comment: any, condition: any, unshift = true) => {
  if (comment) {
    if (comments && comments.length > 0) {
      const isCommented = comments.some(condition)
      if (!isCommented) {
        const currentComments = deepClone(comments ?? [])
        if (unshift) {
          currentComments.unshift(comment)
        } else {
          currentComments.push(comment)
        }
        return currentComments
      }
      return comments
    }
    return [comment]
  }
  return []
}

const initState = {
  scrollToComment: false,
  countComments: [],
  comments: [],
  total: 0,
  loading: false,
  submitComment: false,
  hasMore: false,
  oldestCommentId: null
}

const useCommentStore = create<CommentState>((set, get) => ({
  ...initState,
  setScrollToComment: (scrollToComment: boolean) => {
    return set(
      produce((state) => {
        state.scrollToComment = scrollToComment
      })
    )
  },
  setLoadingComment: (loading: boolean) => {
    return set(
      produce((state) => {
        state.loading = loading
      })
    )
  },
  addComment: (comment: ICommentItem) => {
    const { comments } = get()
    const currentComments = addComments(comments, comment, (a: any) => a && a._id === comment._id)
    return set(
      produce((state) => {
        state.comments = currentComments
        state.total = Number(state.total ?? 0) + 1
        state.submitComment = true
      })
    )
  },
  replaceComment: (commentId: string, comment: ICommentItem, merge = false) => {
    const { comments } = get()
    const currentComment = comments.find((comment) => comment._id === commentId)
    if (currentComment) {
      const currentComments = replaceItemWithCondition({
        input: comments,
        item: comment,
        condition: (comment: ICommentItem) => comment._id === commentId,
        merge
      })
      return set(
        produce((state) => {
          state.comments = currentComments
          state.submitComment = false
        })
      )
    }
  },
  removeComment: (commentId: string) => {
    const { comments } = get()
    return set(
      produce((state) => {
        state.comments = comments.filter((c) => c._id !== commentId)
        state.submitComment = false
      })
    )
  },
  resetCommentStore: () => {
    return set(initState)
  },
  loadComments: async (data: ResultFetchDataComment) => {
    const { resetCommentStore } = get()
    //reset store
    resetCommentStore()
    // init store
    const { comments, lastComments, hasMore, total } = data || {}
    return set(
      produce((state) => {
        state.comments = comments
        state.total = total
        state.loading = false
        state.hasMore = hasMore
        state.oldestCommentId = lastComments?._id || null
      })
    )
  },
  loadMoreComment: async (data: ResultFetchDataComment) => {
    const { comments: currentComments } = get()
    //setLoadingComment(true)
    const { comments, lastComments, hasMore } = data || {}
    const stateComments = mergeArray(currentComments, comments, '_id')
    return set(
      produce((state) => {
        state.loading = false
        state.comments = stateComments
        state.hasMore = hasMore
        state.oldestCommentId = lastComments?._id || null
      })
    )
  },
  loadReplyComment: async (comment: ICommentItem, data: ResultFetchDataComment) => {
    const { comments } = get()
    const { comments: resultReplyComment, lastComments, total, hasMore } = data || {}
    const currentComment = comments.find((stateComment) => comment._id === stateComment._id)
    if (currentComment) {
      const lstReplyComments = mergeArray(
        currentComment.replyComments ?? [],
        resultReplyComment,
        '_id'
      )
      const stateComments = replaceItem(
        comments,
        {
          ...currentComment,
          replyComments: orderBy(lstReplyComments, ['createdAt', 'asc']),
          lastReplyComment: lastComments,
          hasReplyComment: hasMore,
          totalReplied: total,
          totalShowMoreComments: lstReplyComments?.length
        },
        '_id'
      )
      return set(
        produce((state) => {
          state.comments = stateComments
        })
      )
    }
  },
  loadMoreReplyComment: async (commentId: string, data: ResultFetchDataComment) => {
    const { comments } = get()
    const currentComment = comments.find((comment) => comment._id === commentId)
    if (currentComment) {
      const { comments: lstReplyComment, lastComments, hasMore, total } = data || {}
      const currentComments = mergeArray(lstReplyComment, currentComment.replyComments ?? [], '_id')
      const stateComments = replaceItem(
        comments,
        {
          ...currentComment,
          replyComments: orderBy(currentComments, ['createdAt', 'asc']),
          lastReplyComment: lastComments,
          hasReplyComment: hasMore,
          totalReplied: total,
          totalShowMoreComments: currentComments?.length
        },
        '_id'
      )
      return set(
        produce((state) => {
          state.comments = stateComments
        })
      )
    }
  },
  addReplyComment: (commentId: string, comment: ICommentItem) => {
    const { comments } = get()
    const currentComment = comments.find((comment) => comment._id === commentId)
    if (currentComment) {
      const currentReplyComments = addComments(
        currentComment.replyComments || [],
        comment,
        (a: any) => a && a._id === comment._id,
        false
      )
      const stateReplyComments = replaceItem(
        comments,
        {
          ...currentComment,
          replyComments: orderBy(currentReplyComments, ['createdAt', 'asc'])
        },
        '_id'
      )
      return set(
        produce((state) => {
          state.comments = stateReplyComments
          //state.submitComment = true
        })
      )
    }
  },
  replaceReplyComment: ({
    commentId,
    parentCommentId,
    comment,
    removeComment = false,
    updateCommentCount = true
  }: {
    commentId?: string
    parentCommentId?: string
    comment?: ICommentItem
    removeComment?: boolean
    updateCommentCount?: boolean
  }) => {
    const { comments } = get()
    const currentComment = comments.find((comment) => comment._id === parentCommentId)
    if (currentComment) {
      const currentReplyComments = removeComment
        ? currentComment.replyComments.filter((c) => c._id !== commentId)
        : replaceItemWithCondition({
            input: currentComment.replyComments,
            item: { ...comment, isCreated: true },
            condition: (comment: ICommentItem) => comment._id === commentId
          })
      const newComment = {
        ...currentComment,
        replyComments: orderBy(currentReplyComments, ['createdAt', 'asc']),
        totalShowMoreComments: currentReplyComments?.length,
        lastReplyComment: currentReplyComments?.[0] || null
      }

      if (updateCommentCount) {
        newComment.totalReplied = Number(currentComment.totalReplied) + (removeComment ? 0 : 1)
      }

      const stateReplyComments = replaceItem(comments, newComment, '_id')
      return set(
        produce((state) => {
          state.comments = stateReplyComments
          //state.submitComment = false
        })
      )
    }
  },
  updateVoteComment: ({
    commentId,
    interactionFeed
  }: {
    commentId?: string
    interactionFeed?: InteractionFeed
  }) => {
    const { comments } = get()
    const currentComment = comments.find((c) => c._id === commentId)
    if (currentComment) {
      const currentComments = replaceItemWithCondition({
        input: comments,
        item: { ...currentComment, ...interactionFeed },
        condition: (comment: ICommentItem) => comment._id === commentId
      })

      return set(
        produce((state) => {
          state.comments = currentComments
        })
      )
    }
  },
  updateVoteReplyComment: ({
    commentId,
    parentCommentId,
    interactionFeed
  }: {
    commentId?: string
    parentCommentId?: string
    interactionFeed?: InteractionFeed
  }) => {
    const { comments } = get()
    const currentParentComment = comments.find((comment) => comment._id === parentCommentId)
    if (currentParentComment) {
      const currentComment = currentParentComment?.replyComments.find((c) => c._id === commentId)
      if (currentComment) {
        const currentReplyComments = replaceItemWithCondition({
          input: currentParentComment.replyComments,
          item: { ...currentComment, ...interactionFeed },
          condition: (comment: ICommentItem) => comment._id === commentId
        })
        const newComment = {
          ...currentParentComment,
          replyComments: orderBy(currentReplyComments, ['createdAt', 'asc'])
        }

        const stateReplyComments = replaceItem(comments, newComment, '_id')

        return set(
          produce((state) => {
            state.comments = stateReplyComments
            //state.submitComment = false
          })
        )
      }
    }
  }
}))

export default useCommentStore
