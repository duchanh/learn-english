import { shortcutNumber } from '@/utils/number'
import clsx from 'clsx'
import { FeedSocialProps, InteractionFeed } from 'Models'

interface IButtonComment extends FeedSocialProps {
  interactionFeed?: InteractionFeed
  isHorizontal?: boolean
}

const ButtonComment = ({
  interactionFeed,
  isDetailPage,
  isHorizontal,
  onClickComment
}: IButtonComment) => {
  const totalComments = shortcutNumber(interactionFeed?.totalComments)

  return isHorizontal ? (
    <div
      className={clsx('flex items-center justify-center cursor-pointer', {
        'border-solid border-l-[1px] border-r-[1px] border-y-0 border-grey-100 mx-2 px-2':
          isDetailPage
      })}
      onClick={onClickComment}
    >
      <i className='ms ms-text_sms text-fs-20 text-grey-400 mr-2' />
      {interactionFeed?.totalComments > 0 || isDetailPage ? (
        <span className='text-fs-14 text-grey-700'>{totalComments}</span>
      ) : null}
      <span className={clsx('text-fs-14 text-grey-700 ml-1', { hidden: isDetailPage })}>
        Bình luận
      </span>
    </div>
  ) : (
    <>
      <div
        id='button-comment'
        className='w-[2.5rem] h-[2.5rem] rounded-full bg-white text-gray-300 mb-1 flex justify-center items-center cursor-pointer'
        onClick={() => {
          if (onClickComment) onClickComment()
        }}
      >
        <i className='ms ms-text_sms text-fs-24 text-grey-400' />
      </div>
      <div
        className={clsx(
          'w-[2.5rem] flex justify-center items-center text-fs-14 font-normal mb-[1.75rem]'
        )}
      >
        {totalComments}
      </div>
    </>
  )
}

export default ButtonComment
