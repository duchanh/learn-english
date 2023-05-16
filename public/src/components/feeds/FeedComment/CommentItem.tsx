import { getRelativeTime } from '@/utils/datetime'
import { ICommentItem } from 'Models'
import { useState } from 'react'
import ReplyComment from './ReplyComment'
import { useProtected } from '@/hooks/useProtected'
import Avatar from '@/components/common/Avatar'
import { parseStringToHtml } from '@/utils/html'
import ViewMoreContent from '@/components/common/ViewMoreContent'
import { MAX_LINE_VIEW_MORE_COMMENT } from '@/constants/number'
import { CommentStatusEnum } from '@/constants/enum/comment.enum'
import clsx from 'clsx'
import { useVoteComment } from '@/hooks/feed/useVoteComment'
import { initStyleByVoteType } from '@/extensions/feed'
import ButtonVote from '@/components/common/Button/ButtonVote'

interface CommentItemProps {
  comment: ICommentItem
  showReply?: boolean
  focusInputReply?: boolean
  parentId?: string
}

const CommentItem = (props: CommentItemProps) => {
  const { comment, showReply = true, focusInputReply, parentId } = props

  const { onUpVoteComment, onDownVoteComment } = useVoteComment(comment, parentId)

  const [showInputReply, setShowInputReply] = useState(false)

  const isPending = comment?.status === CommentStatusEnum.PENDING

  const styles = initStyleByVoteType(comment?.voteType)

  const protectedAction = useProtected()

  const onShowInputReply = (e?: any) => {
    if (!isPending) {
      setShowInputReply((isReply) => !isReply)
    }
  }

  return comment ? (
    <div className={clsx('mb-4', { 'opacity-50': isPending })} key={comment._id}>
      <div className='flex justify-between items-center mb-2'>
        <div className='flex items-center'>
          <Avatar
            username={comment.author?.meeyIdData?.name}
            size={24}
            avatar={comment.author?.meeyIdData?.avatar}
            className={clsx('mr-1')}
          />
          <div className={clsx('text-fs-14 font-medium')}>{comment.author?.meeyIdData?.name}</div>
          <i className='ms ms-dot_small text-fs-12 text-grey-400' />
          <div className='ml-1 text-grey-500 text-fs-12'>{getRelativeTime(comment.createdAt)}</div>
        </div>
      </div>
      <ViewMoreContent
        more={'Xem thêm'}
        less='Thu gọn'
        lines={MAX_LINE_VIEW_MORE_COMMENT}
        className={'text-fs-14 mb-2 break-words'}
        anchorClassName='text-fs-14 border-none bg-transparent text-gray-600'
        buttonMobile
        content={parseStringToHtml(comment.content)}
      />
      <div className='flex items-center'>
        <ButtonVote
          disable={isPending}
          className='mr-4'
          styles={styles}
          upVoteCount={comment?.upVoteCount}
          onUpVote={onUpVoteComment}
          onDownVote={onDownVoteComment}
        />
        {showReply ? (
          <div
            className='text-fs-12 font-medium text-grey-600 cursor-pointer'
            onClick={protectedAction(onShowInputReply)}
          >
            Phản hồi
          </div>
        ) : null}
      </div>
      {showReply ? (
        <ReplyComment
          comment={comment}
          showInputReply={showInputReply}
          focusInputReply={focusInputReply || showInputReply}
          onShowInputReply={onShowInputReply}
        />
      ) : null}
    </div>
  ) : null
}

export default CommentItem
