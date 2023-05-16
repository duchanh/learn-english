import { DeviceContext } from '@/context/device.context'
import { useFeedContext } from '@/hooks/feed/useFeed'
import { Category, RelatedFeed } from 'Models'
import { useContext } from 'react'
import FeedGroup from '../FeedGroup'

interface IFeedRelatedProps {
  feedRelated: RelatedFeed[]
  category?: Category
}

const FeedRelatedDesktop = ({ feedRelated }: IFeedRelatedProps) => {
  return (
    <div className=' w-[18rem] bg-transparent hidden md:block'>
      <FeedGroup title='Bài đăng liên quan' data={feedRelated} />
    </div>
  )
}

const FeedRelatedMobile = ({ feedRelated, category }: IFeedRelatedProps) => {
  return (
    <FeedGroup
      title='Bài đăng liên quan'
      data={feedRelated}
      className='px-4 bg-white'
      category={category}
    />
  )
}

const FeedRelated = () => {
  const { feedRelated, feedCategory } = useFeedContext()

  const { isMobile } = useContext(DeviceContext)

  return feedRelated && feedRelated.length > 0 ? (
    isMobile ? (
      <FeedRelatedMobile feedRelated={feedRelated} category={feedCategory} />
    ) : (
      <FeedRelatedDesktop feedRelated={feedRelated} />
    )
  ) : null
}

export default FeedRelated
