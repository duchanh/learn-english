import Link from 'next/link'
import { Feed } from 'Models'
import { forwardRef, Ref } from 'react'
import useFeedItem from '@/hooks/feed/useFeedItem'
import FeedSocialHorizontal from '../FeedSocial/FeedSocialHorizontal'
import FeedCategory from '../FeedCategory'
import Avatar from '@/components/common/Avatar'
import sizeConstants from '@/constants/size'
import FeedThumbnail from '../FeedThumbnail'
import clsx from 'clsx'
import FeedPublishedBy from '../FeedPublishedBy'
import ViewMoreContent from '@/components/common/ViewMoreContent'
import { parseStringToHtml } from '@/utils/html'
import { MAX_LINE_VIEW_MORE_SUMMARY } from '@/constants/number'
import FeedMore from './FeedMore'
import useTrackingFeed from '@/hooks/tracking/useTrackingFeed'

export interface FeedItemProps {
  feed: Feed
}
const FeedItem = forwardRef((props: FeedItemProps, ref: Ref<any>) => {
  const { feed } = props
  const {
    feedUrl,
    feedTitle,
    htmlRef,
    feedTitleRef,
    feedCategory,
    feedPublishedBy,
    publishedAt,
    heightTitle,
    isFeedAllowDomain,
    onClickComment
  } = useFeedItem(feed, ref)

  const { trackingUser } = useTrackingFeed()
  const onTrackingFeed = () => {
    if (!isFeedAllowDomain) {
      trackingUser(feed)
    }
  }

  return (
    <div
      className='flex w-full md:shadow-[0px_0px_3px_rgba(0,0,0,0.1)] md:rounded-lg bg-white mb-2 md:mb-5'
      ref={htmlRef}
    >
      <div className='flex flex-col w-full'>
        <div className='flex items-center justify-between p-4 pb-0 mb-2'>
          <div className='flex items-center'>
            <Avatar
              size={sizeConstants.avatar.normal.width}
              className='mr-1'
              avatar={feedPublishedBy?.avatar}
              username={feedPublishedBy?.fullname}
            />
            <FeedPublishedBy
              feedPublishedBy={feedPublishedBy}
              publishedAt={publishedAt}
              className='w-full'
            />
          </div>
          <FeedMore feed={feed} />
        </div>

        <div className='px-4 mb-2'>
          <ViewMoreContent
            more={'Xem thêm'}
            lines={MAX_LINE_VIEW_MORE_SUMMARY}
            className={'text-fs-14 mb-2 break-words'}
            anchorClassName='text-fs-14 border-none bg-transparent text-gray-600'
            buttonMobile
            content={parseStringToHtml(feed.comment)}
            showButtonLessContent={false}
          />
        </div>
        {feed?.link ? (
          <>
            <Link
              href={isFeedAllowDomain ? feedUrl : feed?.link}
              title={feedTitle}
              className={clsx('w-full')}
              legacyBehavior
            >
              <a target={isFeedAllowDomain ? '' : '_blank'} title={feedTitle} onClick={onTrackingFeed}>
                <FeedThumbnail feed={feed} className='w-full h-auto' showVideo={true} />
              </a>
            </Link>
            <Link
              href={isFeedAllowDomain ? feedUrl : feed?.link}
              title={feedTitle}
              className='w-full'
              legacyBehavior
            >
              <a target={isFeedAllowDomain ? '' : '_blank'} title={feedTitle} onClick={onTrackingFeed}>
                <div className='bg-dark-gray px-4 py-2'>
                  <div
                    className='text-base font-semibold text-grey-800 line-clamp-2'
                    ref={feedTitleRef}
                  >
                    {feedTitle}
                  </div>
                  {heightTitle <= 24 && feed.summary ? (
                    <div className='mt-1 text-fs-12 text-grey-600 line-clamp-1'>{feed.summary}</div>
                  ) : null}
                </div>
              </a>
            </Link>
          </>
        ) : null}

        <FeedCategory feedCategory={feedCategory} />
        <FeedSocialHorizontal feed={feed} onClickComment={onClickComment} />
      </div>
    </div>
  )
})

export default FeedItem
