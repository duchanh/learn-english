import { TrendingUpIcon } from '@/constants/images'
import { useFeed } from '@/hooks/feed/useFeed'
import sizeConstants from '@/constants/size'
import { FeedTrendingMock } from '@/constants/mock'
import FeedThumbnail from '../FeedThumbnail'
import { useContext } from 'react'
import { DeviceContext } from '@/context/device.context'

const FeedTrendingItem = ({ feed }: { feed: any }) => {
  const { feedTitle, summary } = useFeed(feed)
  const { isMobile } = useContext(DeviceContext)

  const resizeImage = isMobile
    ? sizeConstants.feed.trendingDetailMobile
    : sizeConstants.feed.trendingDetail

  const resizeOptions = {
    ...resizeImage
  }
  const width = resizeImage.width
  const height = resizeImage.height
  return (
    <div className='flex justify-between mb-[22px] items-center md:items-start'>
      <div className='flex mr-4 flex-[0_0_108px] md:flex-[0_0_135px]'>
        <FeedThumbnail
          className='object-cover rounded-[4px]'
          feed={feed}
          width={width}
          height={height}
          resizeOptions={resizeOptions}
          shortSource={true}
        />
      </div>
      <div className='flex flex-col min-w-[calc(100%-108px)] md:min-w-[calc(100%-135px)]'>
        <div className='line-clamp-3 md:line-clamp-2 font-semibold text-base text-grey-800 mb-1'>
          {feedTitle}
        </div>
        <div className='text-fs-14 text-grey-600 hidden md:block md:line-clamp-2'>{summary}</div>
      </div>
    </div>
  )
}

const FeedTrending = () => {
  const data = FeedTrendingMock

  return data && data.length > 0 ? (
    <div className='px-3 mb-6 border-b-[1px] border-grey-100 border-solid border-x-0 border-t-0 '>
      <div className='flex items-center mb-5'>
        <img src={TrendingUpIcon} width={20} height={20} alt='Trending up' />
        <div className='text-fs-20 font-medium ml-2'>Tin xu hướng</div>
      </div>

      <div>
        {data?.map((feed) => (
          <FeedTrendingItem key={feed._id} feed={feed} />
        ))}
      </div>
    </div>
  ) : null
}

export default FeedTrending
