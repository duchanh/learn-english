import FeedContent from '@/components/feeds/FeedDetail/FeedContent'
import FeedRelated from '@/components/feeds/FeedDetail/FeedRelated'
import FeedShare from '@/components/feeds/FeedDetail/FeedShare'
import LayoutFeeds from '@/components/layouts/LayoutFeeds'
import DetailSeo from '@/components/seo/DetailSeo'
import { FeedContextProvider } from '@/context/feed.context'
import { Feed, InteractionFeed } from 'Models'
import dynamic from 'next/dynamic'
import FeedBreadcrumb from '@/components/feeds/FeedDetail/FeedBreadcrumb'
import { useFeedDetail } from '@/hooks/feed/useFeedDetail'
import { useEffect, useState } from 'react'
const FeedComment = dynamic(() => import('@/components/feeds/FeedComment'), { ssr: false })
const FeedSocial = dynamic(() => import('@/components/feeds/FeedDetail/FeedSocial'), {
  ssr: false
})
const FeedSocialMobile = dynamic(() => import('@/components/feeds/FeedDetail/FeedSocialMobile'), {
  ssr: false
})

interface IFeedDetailProps {
  feed: Feed
  interactionFeed: InteractionFeed
}
const FeedDetail = (props: IFeedDetailProps) => {
  const { feed, interactionFeed } = props

  const { feedCategory } = useFeedDetail(feed, interactionFeed)

  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setFirstLoad(false)
    },500)
    return () => {
      setFirstLoad(true)
    }
  },[feed])

  return (
    <FeedContextProvider {...props}>
      <LayoutFeeds currentCate={feedCategory} hiddenLeftContent={true}>
        <DetailSeo />
        <div className='flex flex-col md:flex-row'>
          <div className='md:w-[586px]'>
            <FeedBreadcrumb />
            <div className='bg-white relative rounded-lg'>
              <div className='md:rounded-lg p-4 border border-grey-50 mb-2 md:mb-6'>
                <FeedContent />
                {!firstLoad && <FeedShare />}
                
                 <FeedComment />
                <FeedSocialMobile />
              </div>
            </div>
            <FeedSocial />
          </div>

          <div className='md:block md:sticky top-[96px] md:h-[calc(100vh-96px)] md:px-4 md:ml-6'>
            <FeedRelated />
          </div>
        </div>
      </LayoutFeeds>
    </FeedContextProvider>
  )
}

export default FeedDetail
