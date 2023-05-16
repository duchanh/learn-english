import SkeletonListArticleMobile from '@/components/Skeleton/SkeletonListArticleMobile'
import FeedItem from '@/components/feeds/FeedItem'
import { BLOCK_NEAR_YOU } from '@/constants/block-feed'
import { useFeedListing } from '@/hooks/feed/useFeedListing'
import { Fragment, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import FeedNearYou from './FeedBlock/FeedNearYou'
import { LIMIT_FEED_SCROLL } from '@/constants/number'

type FeedItemType = React.ElementRef<typeof FeedItem>

const FeedList = () => {
  const { listMenuRef, isValidating, hasMore, feeds, onLoadMore } = useFeedListing<FeedItemType>()

  const [firstLoad, setFirstLoad] = useState(true)
  useEffect(() => {
    if (!isValidating && firstLoad) {
      setFirstLoad(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [isValidating, firstLoad])
  return (
    <div className='mt-[-1px] mb-7'>
      {firstLoad ? (
        <div className='w-[100vw] md:w-[auto] md:max-h-[calc(100vh-80px)] max-h-[calc(100vh-100px)] overflow-y-hidden md:px-1 md:mx-[-4px]'>
          <SkeletonListArticleMobile />
        </div>
      ) : (
        <>
          <InfiniteScroll
            dataLength={feeds.length}
            next={onLoadMore}
            hasMore={feeds.length >= LIMIT_FEED_SCROLL ? false : hasMore}
            loader={<SkeletonListArticleMobile />}
            scrollThreshold='1500px'
          >
            <>
              {feeds?.map((item, index: number) => (
                <Fragment key={item._id}>
                  <FeedItem
                    feed={item}
                    ref={(ele: FeedItemType) => {
                      listMenuRef.current[index] = ele
                    }}
                  />
                  {index === BLOCK_NEAR_YOU ? (
                    <div>
                      <FeedNearYou />
                    </div>
                  ) : null}
                </Fragment>
              ))}
            </>
          </InfiniteScroll>

          {feeds.length >= LIMIT_FEED_SCROLL ? (
            <>
              {!isValidating ? (
                <div className='flex justify-center mt-5 '>
                  <div
                    className='cursor-pointer bg-white px-4 py-1.5 flex items-center justify-between text-fs-12 border-[0.75px] border-grey-100 border-solid rounded-[44px] uppercase  text-grey-700'
                    onClick={onLoadMore}
                  >
                    Xem thêm
                    <i className='ms ms-chervon_down text-base text-grey-400 ml-2' />
                  </div>
                </div>
              ) : (
                <SkeletonListArticleMobile />
              )}
            </>
          ) : null}
        </>
      )}
    </div>
  )
}

export default FeedList
