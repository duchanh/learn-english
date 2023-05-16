import FeedItem from '@/components/feeds/FeedItem'
import { useFeedListing } from '@/hooks/feed/useFeedListing'
import { Fragment } from 'react'

type FeedItemType = React.ElementRef<typeof FeedItem>

const FeedListAdded = () => {
  const { listMenuRef, feedsAdded, } = useFeedListing<FeedItemType>()
  return (
    <>
      {feedsAdded?.map((item, index: number) => (
        <Fragment key={item._id}>
          <FeedItem
            feed={item}
            ref={(ele: FeedItemType) => {
              listMenuRef.current[index] = ele
            }}
          />
        </Fragment>
      ))}
    </>
  )
}
export default FeedListAdded
