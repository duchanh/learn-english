import { useCountFeed } from '@/hooks/feed/useFeedListing'
import clsx from 'clsx'
import FeedShareButton from '../FeedShare/FeedShareButton'
import ButtonVote from '@/components/common/Button/ButtonVote'
import { Feed, FeedSocialProps } from 'Models'
import { useContext } from 'react'
import { DeviceContext } from '@/context/device.context'
import { useVoteFeed } from '@/hooks/feed/useVote'
import ButtonComment from '@/components/common/Button/ButtonComment'

interface IFeedSocialHorizontal extends FeedSocialProps {
  feed: Feed
  border?: boolean
}

const FeedSocialHorizontal = ({
  feed,
  border = true,
  className,
  isDetailPage = false,
  onClickComment
}: IFeedSocialHorizontal) => {
  const { isMobile } = useContext(DeviceContext)

  const interactionFeed = useCountFeed(feed?._id)

  const { onUpVoteFeed, onDownVoteFeed } = useVoteFeed(feed)

  return (
    <div
      className={clsx(className, {
        'border-t-[1px] border-x-0 border-b-0 border-grey-50 border-solid': border,
        'grid grid-cols-3 py-2.5': !isDetailPage,
        'flex justify-center': isDetailPage
      })}
    >
      <ButtonVote
        styles={interactionFeed?.styles}
        upVoteCount={interactionFeed?.upVoteCount}
        isDetailPage={isDetailPage}
        onUpVote={onUpVoteFeed}
        onDownVote={onDownVoteFeed}
      />
      <ButtonComment
        isDetailPage={isDetailPage}
        interactionFeed={interactionFeed}
        onClickComment={onClickComment}
        isHorizontal={true}
      />
      <FeedShareButton
        isMobile={isMobile}
        feed={feed}
        wrapperClassName='flex items-center justify-center'
      >
        <div className='flex items-center justify-center cursor-pointer'>
          <i className='ms ms-share_1 text-fs-20 text-primary-400 mr-2' />
          <div className='text-fs-14 text-primary-400'>Chia sẻ</div>
        </div>
      </FeedShareButton>
    </div>
  )
}

export default FeedSocialHorizontal
