import { getThumbnail } from '@/extensions/images'
import { getThumbnailUri } from '@/extensions/images'
import { FeedContext } from '@/context/feed.context'
import { generateFeedUrl } from '@/extensions/route'
import { Feed } from 'Models'
import { useContext } from 'react'
import { isHorizontal as isHorizontalImage, resizeImageWithOriginal } from '@/extensions/images'
import { FeedTypeEnum } from '@/constants/enum/feed.enum'
import { getFeedVideoEmbed } from '@/extensions/feed'
import { DOMAIN_ALLOW } from '@/constants/feed-domain-allow'

export const useFeed = (feed: Feed) => {
  const { thumbnail: currentThumbnail } = feed || {}

  const thumbnail = getThumbnail(currentThumbnail)

  const { width, height } = thumbnail || {}

  const feedUrl = generateFeedUrl(feed)

  const feedPublishedBy = feed?.publishedBy || null

  const feedCategory = feed?.categories?.[0] || null

  const feedCategories = feed?.categories || []

  const isHorizontal = isHorizontalImage(width, height)

  const feedSource = feed?.source || null

  const feedVideo = feed?.video || null

  const feedRelated = feed?.feedsRelated || []

  const isFeedVideo = feed?.type === FeedTypeEnum.VIDEO

  const videoUrl = getFeedVideoEmbed(feedVideo?.url)

  const feedThumbnailUri = getThumbnailUri(thumbnail)

  const isResizeOnFly = !!thumbnail?.uri

  const feedTitle = feed?.title?.toString()?.trim()

  const isFeedAllowDomain = DOMAIN_ALLOW.includes(feed?.source?.domain)

  return {
    ...feed,
    thumbnail: thumbnail,
    isHorizontal,
    feedUrl,
    feedCategory,
    feedCategories,
    feedPublishedBy,
    feedSource,
    feedVideo,
    feedRelated,
    feedThumbnailUri,
    isResizeOnFly,
    feedTitle,
    isFeedVideo,
    videoUrl,
    isFeedAllowDomain
  }
}

export const useFeedThumbnail = (feed: Feed) => {
  const { thumbnail: currentThumbnail } = feed || {}

  const thumbnail = getThumbnail(currentThumbnail)

  const { width, height } = thumbnail || {}

  const {
    width: widthThumbnail,
    height: heightThumbnail,
    resizeHorizontal,
    ratioOriginalImage
  } = resizeImageWithOriginal({
    originalWidth: width,
    originalHeight: height
  })

  const aspectClass = resizeHorizontal ? 'aspect-[1.91/1]' : 'aspect-[4/5]'

  return {
    thumbnail,
    widthThumbnail,
    heightThumbnail,
    resizeHorizontal,
    ratioOriginalImage,
    aspectClass
  }
}

export const useFeedContext = () => {
  const { feed } = useContext(FeedContext)

  return useFeed(feed)
}
