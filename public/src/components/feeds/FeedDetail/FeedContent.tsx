import { useFeedContext } from '@/hooks/feed/useFeed'
import FeedPublishedBy from '../FeedPublishedBy'
import Avatar from '@/components/common/Avatar'
import sizeConstants from '@/constants/size'
import { parseContentToHtml } from '@/utils/html'
import dynamic from 'next/dynamic'
import FeedMore from '../FeedItem/FeedMore'
import FeedThumbnail from '../FeedThumbnail'
const FeedIframeVideo = dynamic(() => import('../FeedIframeVideo'), { ssr: false })

const FeedContent = () => {
  const feed = useFeedContext()

  const {
    isFeedVideo,
    feedPublishedBy,
    feedVideo,
    feedSource,
    publishedAt,
    feedTitle,
    summary,
    description,
    comment,
    isFeedAllowDomain
  } = feed
  return (
    <div className='flex flex-col mb-4'>
      <div className='flex items-center justify-between  mb-3'>
        <div className='flex items-center'>
          <Avatar
            size={sizeConstants.avatar.normal.width}
            className='mr-1'
            textClassName='text-fs-12'
            avatar={feedPublishedBy?.avatar}
            username={feedPublishedBy?.fullname}
          />
          <FeedPublishedBy feedPublishedBy={feedPublishedBy} publishedAt={publishedAt} />
        </div>
        <FeedMore feed={feed} />
      </div>
      <div
        className='text-fs-14 text-grey-800 mb-3 break-words feed-content'
        dangerouslySetInnerHTML={{ __html: comment }}
      ></div>
      {isFeedAllowDomain ? (
        <div className='feed-content bg-light-gray px-2 py-3 rounded-[4px]'>
          <div className='flex items-center mb-1'>
            <img src={feedSource?.logo} className='mr-[6px] h-4' alt='MeeyShare' />
            <span className='text-grey-600'>{feedSource?.domain}</span>
            <i className='ms ms-chervon_right text-grey-400 text-fs-12' />
          </div>
          <div className='text-fs-18 mb-3'>{feedTitle}</div>
          <div className='text-fs-14 text-grey-700 italic mb-3'>{summary}</div>
          {isFeedVideo ? (
            <FeedIframeVideo video={feedVideo} title={feedTitle} />
          ) : (
            <div className='text-fs-14 text-grey-800 feed-content break-words'>
              {parseContentToHtml(description)}
            </div>
          )}
        </div>
      ) : (
        <>
          <a
            title={feedTitle}
            href={feed.link}
            target='_blank'
            rel='noopener noreferrer'
            className='w-[calc(100% + 32px)] -mx-4'
          >
            <FeedThumbnail feed={feed} className='w-full' />
            {feedTitle ? (
              <div className='bg-dark-gray px-4 py-2'>
                <div className='text-base font-semibold text-grey-800 line-clamp-2'>
                  {feedTitle}
                </div>
              </div>
            ) : null}
          </a>
        </>
      )}
      {feed.link ? (
        <div className='mt-3'>
          <span className='font-medium text-fs-14 text-grey-800'>Link gốc: </span>
          <span className='text-fs-14 text-grey-700 italic'>
            <a href={feed.link} target='_blank' title={feed.link} >
              {feed.link}
            </a>
          </span>
        </div>
      ) : null}
    </div>
  )
}

export default FeedContent
