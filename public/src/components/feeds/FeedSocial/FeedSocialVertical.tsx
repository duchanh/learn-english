import ButtonComment from '@/components/common/Button/ButtonComment'
import ButtonVote from '@/components/common/Button/ButtonVote'
import { useFeedDetailVote } from '@/hooks/feed/useFeedDetail'
import clsx from 'clsx'
import { FeedSocialProps } from 'Models'
import FeedShareButton from '../FeedShare/FeedShareButton'

interface IFeedSocialVertical extends FeedSocialProps {}

const FeedSocialVertical = ({ onClickComment }: IFeedSocialVertical) => {
  const { isMobile, interactionFeed, feed, onUpVoteFeed, onDownVoteFeed } = useFeedDetailVote()

  return (
    <div className='flex flex-col items-center'>
      <ButtonVote
        styles={interactionFeed?.styles}
        upVoteCount={interactionFeed?.upVoteCount}
        onUpVote={onUpVoteFeed}
        onDownVote={onDownVoteFeed}
        isHorizontal={false}
      />
      <ButtonComment
        interactionFeed={interactionFeed}
        onClickComment={onClickComment}
        isHorizontal={false}
      />
      <FeedShareButton
        isMobile={isMobile}
        feed={feed}
        position='bottom-right'
        wrapperClassName='w-full'
        className='justify-center'
      >
        <div className='flex flex-col items-center'>
          <div className='w-[2.5rem] h-[2.5rem] rounded-full bg-primary-500 text-white flex justify-center items-center cursor-pointer mb-1'>
            <i className='ms ms-share_1 text-fs-24 text-white' />
          </div>
          <div
            className={clsx(
              'flex justify-center items-center text-fs-14 font-normal text-primary-500'
            )}
          >
            Chia sẻ
          </div>
        </div>
      </FeedShareButton>
    </div>
  )
}

export default FeedSocialVertical
