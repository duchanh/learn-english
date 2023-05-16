import { firstOrDefault } from '@/extensions/array'
import { OrderEnum } from '@/constants/enum/common.enum'
import getComment from '@/api/endpoint/comment/get-comment'
import postComment from '@/api/endpoint/comment/post-comment'
import { PREFIX_CHANNEL } from '@/constants/app-config'
import { PAGE_SIZE_COMMENT } from '@/constants/number'
import { AuthContext } from '@/context/auth.context'
import { CommentContext } from '@/context/comment.context'
import { lastOrDefault } from '@/extensions/array'
import useCommentStore from '@/store/comment-store'
import isEqual from 'lodash.isequal'
import { Feed, ICommentItem, IPostComment, ListCommentParams, ResultFetchDataComment } from 'Models'
import { useContext, useEffect, useState } from 'react'
import usePrevious from '../usePrevious'
import useFeedStore from '@/store/feed-store'
import { FeedContext } from '@/context/feed.context'
import toast from 'react-hot-toast'
import FingerprintId from '@/utils/browserFingerprint'
import { initNewComment } from '@/extensions/feed'

interface IReplyComment {
  comment: ICommentItem
  onShowInputReply?: () => void
}

const fetcher = async (
  { channel, oldestCommentId, newestCommentId, replies, order }: ListCommentParams,
  token: string
): Promise<ResultFetchDataComment> => {
  const result = await getComment(
    {
      channel: channel,
      oldestCommentId,
      newestCommentId,
      replies,
      isCount: true,
      limit: PAGE_SIZE_COMMENT,
      order
    },
    token
  )
  const comments = result?.results || []
  const lastComments = !order
    ? lastOrDefault(comments)
    : order === OrderEnum.DESC
    ? lastOrDefault(comments)
    : firstOrDefault(comments)
  const hasMore = comments?.length === PAGE_SIZE_COMMENT
  return {
    comments: comments,
    lastComments,
    hasMore: hasMore,
    total: result?.totalResults || 0
  }
}
const isServer = typeof window === 'undefined'

export const useListCommentByFeed = (feed: Feed) => {
  const { token, login, isLoggedIn, user } = useContext(AuthContext)

  const channel = `${PREFIX_CHANNEL}${feed._id}`

  const previewFeed = usePrevious(feed)

  const fingerprint = isServer ? undefined : FingerprintId()

  const {
    loading,
    comments,
    hasMore,
    total,
    oldestCommentId,
    addComment,
    loadComments,
    loadMoreComment,
    replaceComment,
    removeComment,
    setLoadingComment
  } = useCommentStore()

  const { addCommentCount } = useFeedStore()

  const onLoadMore = async () => {
    if (comments && comments.length > 0) {
      setLoadingComment(true)
      const data = await fetcher({ channel, oldestCommentId, order: OrderEnum.DESC }, token)
      loadMoreComment(data)
    }
  }

  const onLoadComments = async () => {
    setLoadingComment(true)
    // init store
    const data = await fetcher({ channel, order: OrderEnum.DESC }, token)
    loadComments(data)
  }

  const onSendComment = async (value: string | number) => {
    if (value === undefined || value === null) return false
    if (!isLoggedIn) login()
    const innitCommentState = initNewComment({ channel, message: value, user })
    addComment(innitCommentState)
    const dataSend = {
      channel: channel,
      content: value
    } as IPostComment

    const comment = await postComment({ data: dataSend, fingerprint, token })
    if (comment) {
      replaceComment(innitCommentState._id, comment)
      addCommentCount(feed?._id)
    } else {
      removeComment(innitCommentState._id)
      toast.error(`Đã có lỗi xảy ra! Vui lòng thử lại!`)
    }
  }

  useEffect(() => {
    if (feed && !isEqual(previewFeed, feed)) {
      onLoadComments()
    }
  }, [feed])

  return {
    loading,
    channel,
    totalComments: total,
    comments,
    hasMore,
    onLoadMore,
    onSendComment
  }
}

export const useReplyComment = ({ comment, onShowInputReply }: IReplyComment) => {
  const { token, login, isLoggedIn, user } = useContext(AuthContext)

  const { feed } = useContext(FeedContext)

  const { channel } = useContext(CommentContext)

  const [showCommentReply, setShowCommentReply] = useState(false)

  const [loading, setLoading] = useState(false)

  const [submitComment, setSubmitComment] = useState(false)

  const fingerprint = isServer ? undefined : FingerprintId()

  const { loadReplyComment, addReplyComment, loadMoreReplyComment, replaceReplyComment } =
    useCommentStore()

  const { addCommentCount } = useFeedStore()

  const commentId = comment?._id

  const totalShowMoreComments =
    Number(comment.totalReplied ?? 0) - Number(comment.totalShowMoreComments ?? 0)

  const isExistReplyComment = comment.totalReplied && comment.totalReplied > 0

  const isLoadMoreReplyComment = showCommentReply && comment.totalShowMoreComments > 0

  const isHiddenViewMoreComment = isExistReplyComment
    ? Number(comment.totalReplied ?? 0) === Number(comment.totalShowMoreComments ?? 0)
    : false

  const onShowReplyComment = () => {
    if (showCommentReply) {
      if (isLoadMoreReplyComment) {
        // load more reply comment
        onLoadMoreReplyComments()
      } else {
        onLoadReplyComments()
      }
    } else {
      setShowCommentReply(true)
      onLoadReplyComments()
      if (onShowInputReply) onShowInputReply()
    }
  }

  const onLoadReplyComments = async () => {
    setLoading(true)
    // init store
    const data = await fetcher({ channel, replies: commentId, order: OrderEnum.DESC }, token)
    loadReplyComment(comment, data)
    setLoading(false)
  }

  const onLoadMoreReplyComments = async () => {
    setLoading(true)
    // init store
    const data = await fetcher(
      {
        channel,
        replies: commentId,
        oldestCommentId: comment?.lastReplyComment?._id,
        order: OrderEnum.ASC
      },
      token
    )
    loadMoreReplyComment(comment?._id, data)
    setLoading(false)
  }

  // useEffect(() => {
  //   if (showCommentReply) {
  //     onLoadReplyComments()
  //   }
  // }, [showCommentReply])

  const onSendReply = async (value: string | number) => {
    if (value === undefined || value === null) return false
    if (!isLoggedIn) login()
    const dataSend = {
      channel: channel,
      replies: commentId,
      content: value
    } as IPostComment
    setSubmitComment(true)
    const initReplyComment = initNewComment({ channel, message: value, user, replies: commentId })
    setShowCommentReply(true)
    addReplyComment(commentId, initReplyComment)
    const replyComment = await postComment({ data: dataSend, fingerprint, token })
    if (replyComment) {
      replaceReplyComment({
        commentId: initReplyComment?._id,
        parentCommentId: commentId,
        comment: replyComment
      })
      addCommentCount(feed?._id)
    } else {
      replaceReplyComment({
        commentId: initReplyComment?._id,
        parentCommentId: commentId,
        comment: replyComment,
        removeComment: true
      })
      toast.error(`Đã có lỗi xảy ra! Vui lòng thử lại!`)
    }
    setSubmitComment(false)
  }

  return {
    loading,
    submitComment,
    isExistReplyComment,
    isLoadMoreReplyComment,
    isHiddenViewMoreComment,
    totalShowMoreComments,
    showCommentReply,
    onSendReply,
    onShowReplyComment
  }
}
