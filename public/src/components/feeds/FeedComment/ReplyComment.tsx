import SkeletonCommentWrapper from '@/components/Skeleton/SkeletonComment'
import ReplyIcon from '@/components/svg/ReplyIcon'
import { useReplyComment } from '@/hooks/comment/useComment'
import { ICommentItem } from 'Models'
import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import CommentItem from './CommentItem'
const FeedCommentInput = dynamic(() => import('./FeedCommentInput'), { ssr: false })

interface ReplyCommentProps {
  comment: ICommentItem
  showInputReply?: boolean
  focusInputReply?: boolean
  onShowInputReply?: () => void
}

interface IViewMoreReplyCommentProps {
  isExistReplyComment?: boolean
  isHiddenViewMoreComment?: boolean
  showCommentReply?: boolean
  totalShowMoreComments?: number
  onShowReplyComment?: (e: any) => void
}

const ViewMoreReplyComment = ({
  isExistReplyComment,
  isHiddenViewMoreComment,
  totalShowMoreComments,
  onShowReplyComment
}: IViewMoreReplyCommentProps) => {
  return isExistReplyComment ? (
    <div
      className='text-fs-12 font-semibold text-grey-600 cursor-pointer mt-2 flex items-center leading-5'
      onClick={onShowReplyComment}
    >
      {!isHiddenViewMoreComment ? (
        <>
          <ReplyIcon className='text-fs-20 text-grey-400 mr-1 cursor-pointer' />
          <span>{totalShowMoreComments} phản hồi</span>
        </>
      ) : null}
    </div>
  ) : null
}

const ReplyComment = (props: ReplyCommentProps) => {
  const { comment, showInputReply, onShowInputReply } = props

  const inputRef = useRef(null)

  const {
    loading,
    submitComment,
    isExistReplyComment,
    isHiddenViewMoreComment,
    totalShowMoreComments,
    showCommentReply,
    onShowReplyComment,
    onSendReply
  } = useReplyComment({ comment, onShowInputReply })

  const replyBlockStyles = {
    borderLeft: '1.5px solid #DDDDDD'
  }

  useEffect(() => {
    inputRef?.current?.setFocus()
  }, [showInputReply])

  return comment ? (
    <>
      {totalShowMoreComments > 0 ? (
        <ViewMoreReplyComment
          isExistReplyComment={isExistReplyComment}
          isHiddenViewMoreComment={isHiddenViewMoreComment}
          totalShowMoreComments={totalShowMoreComments}
          showCommentReply={showCommentReply}
          onShowReplyComment={onShowReplyComment}
        />
      ) : null}
      <div className='mt-4 px-3 mb-4' style={replyBlockStyles}>
        {loading ? <SkeletonCommentWrapper col={5} /> : null}
        {showCommentReply
          ? comment?.replyComments?.map((reply: ICommentItem, index: number) => (
              <CommentItem
                key={reply._id}
                comment={reply}
                parentId={comment?._id}
                showReply={false}
                focusInputReply={true}
              />
            ))
          : null}
        {showInputReply ? (
          <div className='mb-4'>
            <FeedCommentInput
              ref={inputRef}
              onSendComment={onSendReply}
              placeholder='Phản hồi của bạn...'
              autoFocus={true}
              loading={submitComment}
            />
          </div>
        ) : null}
      </div>
    </>
  ) : null
}

export default ReplyComment
