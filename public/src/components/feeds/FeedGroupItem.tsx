import { generateFeedUrlByCode } from '@/extensions/route'
import { useFeed } from '@/hooks/feed/useFeed'
import { BaseImageProps, Feed, RelatedFeed } from 'Models'
import Link from 'next/link'
import { useRef } from 'react'
import sizeConstants from '@/constants/size'
import Avatar from '../common/Avatar'
import FeedThumbnail from './FeedThumbnail'

interface FeedGroupItemProps extends BaseImageProps {
  feed?: RelatedFeed | Feed | any
}

const FeedGroupItem = (props: FeedGroupItemProps) => {
  const {
    feed,
    resizeOptions = { ...sizeConstants.feed.groupHorizontal, resizingType: 'fill-down' },
    width = sizeConstants.feed.groupHorizontal.width,
    height = sizeConstants.feed.groupHorizontal.height
  } = props || {}

  const { feedPublishedBy, feedTitle } = useFeed(feed)

  const itemRef = useRef<HTMLAnchorElement>(null)
  return (
    <Link
      className='flex justify-between py-2'
      href={generateFeedUrlByCode(feed?.code)}
      title={feedTitle}
      ref={itemRef}
    >
      <div className='mr-4 flex flex-col min-w-[calc(100%_-_120px)]'>
        <div className='text-fs-14 font-medium text-grey-800 mb-1 break-words line-clamp-2'>
          {feedTitle}
        </div>
        <div className='flex items-center'>
          <Avatar
            size={sizeConstants.avatar.xs.width}
            className='mr-1'
            textClassName='text-fs-12'
            avatar={feedPublishedBy?.avatar}
            username={feedPublishedBy?.fullname}
          />
          <div className='text-fs-12 text-grey-400 break-words line-clamp-1'>
            <span>{feedPublishedBy?.fullname}</span>
          </div>
        </div>
      </div>
      <FeedThumbnail
        feed={feed}
        wrapperClassName={`flex-[0_0_4rem] h-[3.75rem] rounded`}
        className='object-cover rounded'
        width={width}
        height={height}
        resizeOptions={resizeOptions}
        shortSource={true}
      />
    </Link>
  )
}
export default FeedGroupItem
