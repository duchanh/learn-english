import { CommentContext } from '@/context/comment.context'
import { useFeedDetailVote } from '@/hooks/feed/useFeedDetail'
import useCommentStore from '@/store/comment-store'
import dynamic from 'next/dynamic'
import { useContext } from 'react'
const FeedCommentInput = dynamic(() => import('../FeedCommentInput'), { ssr: false })

export const HeaderListComment = () => {
  const { onSendComment } = useContext(CommentContext)

  const { interactionFeed } = useFeedDetailVote()

  const { submitComment } = useCommentStore()

  return (
    <>
      <div className='flex items-center justify-between mb-5'>
        <div className='text-grey-800 font-semibold text-base'>
          Bình luận{' '}
          {interactionFeed?.totalComments ? `(${interactionFeed.totalComments || 0})` : ''}
        </div>
        {/* <div>
          <PopOver
            position='bottom-right'
            content={
              <div className='text-grey-800 w-[160px] flex flex-col items-end bg-white rounded-md p-3 shadow-[0px_0px_15px_2px_rgba(0,0,0,0.1)]'>
                <div className='flex w-full justify-end cursor-pointer p-2 text-fs-14 hover:bg-light-gray rounded-lg'>
                  Mới nhất
                </div>
                <div className='flex w-full justify-end cursor-pointer p-2 text-fs-14 hover:bg-light-gray rounded-lg'>
                  Phù hợp nhất
                </div>
              </div>
            }
          >
            <div className='text-fs-14 text-grey-800'>
              Mới nhất
              <i className='ms ms-chervon_down ml-1' />
            </div>
          </PopOver>
        </div> */}
      </div>

      <div className='text-grey-800'>
        <div className='w-full mb-4'>
          <FeedCommentInput onSendComment={onSendComment} loading={submitComment} />
        </div>
      </div>
    </>
  )
}
