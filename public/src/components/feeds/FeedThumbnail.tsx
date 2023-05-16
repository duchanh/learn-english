import { useFeed, useFeedThumbnail } from '@/hooks/feed/useFeed'
import clsx from 'clsx'
import { BaseImageProps, Feed } from 'Models'
import MeeyImage from '@/components/common/MeeyImage'
import FeedIframeVideo from './FeedIframeVideo'
interface IFeedThumbnail extends BaseImageProps {
  feed: Feed
  className?: string
  wrapperClassName?: string
  showSource?: boolean
  shortSource?: boolean
  renderSource?: React.ReactNode
  showVideo?: boolean
}

const FeedSourceThumbnail = ({ feedSource, short = false }: any) => {
  return feedSource ? (
    <div
      className={clsx(
        'absolute rounded right-[5px] bg-[rgba(0,0,0,0.6)] text-white flex items-center justify-center',
        {
          'bottom-1 p-1': short,
          'bottom-[5.5px] p-[2px]': !short
        }
      )}
    >
      <img
        src={feedSource.logo}
        className='mr-[2px] h-3'
        width={12}
        height={12}
        alt={feedSource.domain}
      />
      {!short ? (
        <>
          <span className='text-fs-10'>{feedSource?.domain}</span>
          <i className='ms ms-chervon_right' />
        </>
      ) : null}
    </div>
  ) : null
}

const FeedThumbnail = ({
  feed,
  className,
  wrapperClassName,
  showSource = true,
  shortSource,
  width,
  height,
  resizeOptions,
  renderSource,
  showVideo = false
}: IFeedThumbnail) => {
  const currentFeed = useFeed(feed)

  const { feedThumbnailUri, feedSource, isFeedVideo, feedTitle, video } = currentFeed || {}

  const {
    widthThumbnail,
    heightThumbnail,
    ratioOriginalImage,
    thumbnail,
    aspectClass,
    resizeHorizontal
  } = useFeedThumbnail(feed)
  return (
    <div
      className={clsx(`flex relative`, wrapperClassName)}
      data-image={`${thumbnail?.width}-${thumbnail?.height}`}
      data-resize-image={`${widthThumbnail}-${heightThumbnail}`}
      data-ratio={`${ratioOriginalImage}`}
    >
      {isFeedVideo && showVideo ? (
        <FeedIframeVideo video={video} title={feedTitle} />
      ) : (
        <>
          {feed?.link ? (
            <>
              {feed?.thumbnail?.uri ? (
                <MeeyImage
                  className={clsx(`object-cover`, aspectClass, className)}
                  width={width ?? widthThumbnail}
                  height={height ?? heightThumbnail}
                  src={feedThumbnailUri}
                  alt={feedTitle}
                  resizeOnFly={true}
                  resizeOptions={
                    resizeOptions ?? {
                      resizingType: resizeHorizontal ? 'fill' : 'crop',
                      gravity: 'ce'
                    }
                  }
                />
              ) : (
                <img src={feed?.thumbnail?.url} className='w-full object-cover' />
              )}
            </>
          ) : null}
        </>
      )}
      {showSource ? (
        renderSource ? (
          renderSource
        ) : (
          <FeedSourceThumbnail feedSource={feedSource} short={shortSource} />
        )
      ) : null}
    </div>
  )
}

export default FeedThumbnail
