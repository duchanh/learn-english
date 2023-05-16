import SkeletonCommentWrapper from '@/components/Skeleton/SkeletonComment'
import { CommentContext } from '@/context/comment.context'
import useCommentStore from '@/store/comment-store'
import { useContext } from 'react'
import CommentItem from '../CommentItem'

const ListComment = () => {
  const { comments, hasMore, totalComments, onLoadMore } = useContext(CommentContext)
  const { loading } = useCommentStore()
  return (
    <>
      {comments?.map((comment: any) => (
        <CommentItem key={comment._id} comment={comment} focusInputReply={false} />
      ))}
      {loading ? <SkeletonCommentWrapper col={5} /> : null}
      {hasMore && comments?.length < totalComments ? (
        <div className='flex justify-center mt-7 mb-4'>
          <div
            className='flex items-center justify-center rounded-[44px] border-[0.75px] border-grey-100 border-solid py-1.5 px-4 cursor-pointer'
            onClick={onLoadMore}
          >
            <span className='text-grey-700 uppercase text-fs-12 font-medium'>Xem thêm</span>
            <i className='ms ms-chervon_down text-grey-400 ml-1' />
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ListComment
