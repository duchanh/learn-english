import { Feed } from 'Models'
import FeedBlockItem from './FeedBlockItem'
import CardFeed from '@/components/feeds/CardFeed'
import ButtonNearYou from './ButtonNearYou'
import useLocation from '@/hooks/useLocation'
import useFeedNearYou from '@/hooks/feed/useFeedNearYou'
interface FeedNearYouProps {
  feeds?: Array<Feed>
}

const FeedNearYou = (props: FeedNearYouProps) => {
  const {currentLocation} = useLocation()
  const {feedsNearYou: feeds, getFeedNearYou} = useFeedNearYou()
  return (
    <CardFeed>
      {feeds && feeds.length > 0 ? (
        <>
          <div className='mb-3 border-b-[1px] border-grey-100 border-solid border-x-0 border-t-0 pb-3'>
            <div className='text-fs-12 font-medium uppercase text-grey-500 mb-1'>
              Tin tức gần bạn
            </div>
            <div className='flex items-center'>
              <i className='ms ms-location text-fs-20 text-primary-400 mr-2' />
              <div className='text-fs-18 text-grey-800 font-semibold'>{currentLocation || ''}</div>
            </div>
          </div>

          <div>
            {feeds?.map((item) => (
              <FeedBlockItem feed={item} key={item._id} />
            ))}
          </div>
        </>
      ) : (
        <ButtonNearYou getFeedNearYou={getFeedNearYou} />
      )}
    </CardFeed>
  )
}

export default FeedNearYou
