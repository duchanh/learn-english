import Link from 'next/link'
import clsx from 'clsx'
import FeedThumbnail from '../FeedThumbnail'
import { useFeed } from '@/hooks/feed/useFeed'
import { useCountFeed } from '@/hooks/feed/useFeedListing'

interface FeedBlockItemProps {
  feed: any
  isSideBlock?: boolean
}
const FeedBlockItem = ({ feed, isSideBlock = false }: FeedBlockItemProps) => {
  const { feedTitle, feedUrl } = useFeed(feed)

  const interactionFeed = useCountFeed(feed?._id)

  const totalInteraction =
    (interactionFeed?.totalComments ?? 0) + (interactionFeed?.totalVotes ?? 0)

  return (
    <Link href={feedUrl} title={feedTitle} className='flex mb-3 justify-between'>
      <div className='mr-4 flex flex-col min-w-[calc(100%_-_120px)]'>
        <div
          title={feedTitle}
          className={clsx('text-fs-14 text-grey-800 mb-[2px] break-words line-clamp-2', {
            'font-medium': isSideBlock,
            'font-semibold': !isSideBlock
          })}
        >
          {feed?.title}
        </div>
        <div className='text-fs-12 text-grey-500'>{totalInteraction} tương tác</div>
      </div>
      <div className='flex flex-[0_0_90px] h-[64px]'>
        <FeedThumbnail
          width={90}
          height={64}
          feed={feed}
          className='object-cover rounded'
          shortSource={true}
          resizeOptions={{
            width: 90,
            height: 64,
            resizingType: 'fill-down'
          }}
        />
      </div>
    </Link>
  )
}

export default FeedBlockItem
