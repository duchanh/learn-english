import { DefaultThumbnail } from '@/constants/images'
import sizeConstants from '@/constants/size'
import { resizeOnFlyUrl } from '@/utils/images'
import { ImageS3 } from 'Models'

const isClient = typeof window !== 'undefined'

export const isHorizontal = (width: number, height: number) => {
  if (!width || !height) return false
  return !!(width > height)
}

export const getThumbnail = (thumbnail: ImageS3) => {
  if (!thumbnail) return DefaultThumbnail
  return isImage(thumbnail.uri) || thumbnail.url ? thumbnail : DefaultThumbnail
}

export const getThumbnailUri = (thumbnail: ImageS3) => {
  if (!thumbnail) return DefaultThumbnail.uri
  return isImage(thumbnail.uri) ? thumbnail.uri : DefaultThumbnail.uri
}

export const resizeImageWithOriginal = ({
  originalWidth,
  originalHeight
}: {
  originalWidth: number
  originalHeight: number
}) => {
  const ratioOriginalImage = originalHeight / originalWidth
  const isHorizontalImage = isHorizontal(originalWidth, originalHeight)
  const resizeHorizontal = ratioOriginalImage <= sizeConstants.feed.ratioImage.minRatioResizeImage // 0.9
  const radio = resizeHorizontal
    ? sizeConstants.feed.ratioResizeImage.horizontal //1.91
    : sizeConstants.feed.ratioResizeImage.vertical //4/5
  let width = null
  let height = null
  if (isHorizontalImage) {
    height = originalHeight
    width = Math.ceil(originalHeight * radio)
  } else {
    width = originalWidth
    height = Math.ceil(originalWidth * (1 / radio))
  }
  if (width > sizeConstants.feed.maxWidth) {
    width = sizeConstants.feed.maxWidth //586
    height = Math.ceil(width * (1 / radio))
  }

  if (width > originalWidth || height > originalHeight) {
    if (width > originalWidth) {
      width = originalWidth
      height = Math.ceil(width * (1 / radio))
    } else if (height > originalHeight) {
      height = originalHeight
      width = Math.ceil(originalHeight * radio)
    }
  }

  return {
    width,
    height,
    resizeHorizontal,
    ratioOriginalImage
  }
}

export const resizeThumbnail = ({
  isMobile,
  isHorizontal,
  maxWidth = sizeConstants.feed.maxWidth,
  defaultWidth = sizeConstants.feed.ratioResizeImage.horizontal
}) => {
  let width = null
  let height = null
  if (isClient) {
    width = isMobile ? (window.innerWidth > maxWidth ? maxWidth : window.innerWidth) : maxWidth
  } else {
    width = defaultWidth
  }

  height = Math.ceil(
    width *
      (1 /
        (isHorizontal
          ? sizeConstants.feed.ratioResizeImage.horizontal
          : sizeConstants.feed.ratioResizeImage.vertical))
  )
  return { width, height }
}

export const initOgImages = (thumbnail: ImageS3, metaTitle: string, watermark = true) => {
  if (!thumbnail) return []

  const thumbnailUri = getThumbnailUri(thumbnail)
  return sizeConstants.ogImages.map((size) => {
    const width = size[0]
    const height = size[1]
    let ogImageUrl
    if (thumbnail.uri) {
      ogImageUrl = resizeOnFlyUrl({
        url: thumbnailUri,
        width: width,
        height: height,
        resizingType: 'fill-down',
        gravity: 'ce',
        watermark: watermark,
        watermarkOptions: sizeConstants.feed.watermarkOptions
      })
    } else {
      ogImageUrl = thumbnail?.url
    }
    return {
      url: ogImageUrl,
      secureUrl: ogImageUrl,
      width: width,
      height: height,
      alt: metaTitle,
      type: thumbnail?.mimeType
    }
  })
}

export const isImage = (imageUrl: string) => {
  if (!imageUrl) return false
  return /.(jpg|jpeg|png)$/.test(imageUrl)
}
