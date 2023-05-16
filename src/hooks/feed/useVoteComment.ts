import { AuthContext } from '@/context/auth.context'
import { useContext, useState } from 'react'
import { VoteActionEnum } from '@/constants/enum/vote.enum'
import toast from 'react-hot-toast'
import FingerprintId from '@/utils/browserFingerprint'
import upVoteComment from '@/api/endpoint/vote/up-vote-comment'
import downVoteComment from '@/api/endpoint/vote/down-vote-comment'
import useCommentStore from '@/store/comment-store'
import { updateInteraction } from '@/extensions/feed'
import { InteractionFeed } from 'Models'
import omit from 'lodash.omit'

export const useVote = () => {
  const { isLoggedIn, token, login } = useContext(AuthContext)

  const [isSubmitted, setSubmitted] = useState(false)

  const { updateVoteComment, updateVoteReplyComment } = useCommentStore()

  const replaceCommentState = ({ parentId, result }) => {
    if (parentId) {
      updateVoteReplyComment({
        commentId: result.commentId,
        parentCommentId: parentId,
        interactionFeed: result
      })
    } else {
      updateVoteComment({
        commentId: result.commentId,
        interactionFeed: result
      })
    }
  }

  const onVoteAction = async ({
    comment,
    action,
    parentId
  }: {
    comment: any
    action: VoteActionEnum
    parentId?: string
  }) => {
    let result = null

    const isServer = typeof window === 'undefined'

    const fingerprint = isServer ? undefined : FingerprintId()

    if (isLoggedIn) {
      if (!isSubmitted) {
        setSubmitted(true)
        const initVoteCommentState = updateInteraction({
          interaction: {
            feed: comment?._id,
            commentId: comment?._id,
            totalVotes: comment?.totalVotes,
            upVoteCount: comment?.upVoteCount,
            voteType: comment?.voteType
          } as InteractionFeed,
          action
        })

        replaceCommentState({
          parentId,
          result: omit(initVoteCommentState, 'feed')
        })
        switch (action) {
          case VoteActionEnum.UP_VOTE: {
            result = await upVoteComment({ commentId: comment?._id, fingerprint, token })
            break
          }
          case VoteActionEnum.DOWN_VOTE: {
            result = await downVoteComment({ commentId: comment?._id, fingerprint, token })
            break
          }
          default: {
            break
          }
        }
        if (result) {
          replaceCommentState({
            parentId,
            result
          })
        } else {
          toast.error(`Đã có lỗi xảy ra! Vui lòng thử lại!`)
        }
        setSubmitted(false)
      }
    } else {
      login()
    }
  }

  return { onVoteAction }
}

export const useVoteComment = (comment: any, parentId?: string) => {
  const { onVoteAction } = useVote()

  const onUpVoteComment = async () => {
    onVoteAction({ comment, action: VoteActionEnum.UP_VOTE, parentId })
  }

  const onDownVoteComment = async () => {
    onVoteAction({ comment, action: VoteActionEnum.DOWN_VOTE, parentId })
  }

  return {
    onUpVoteComment,
    onDownVoteComment
  }
}
