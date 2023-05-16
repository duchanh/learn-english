const path = require('path')
import { IResizeOnFlyOption } from 'Models'
import { sign, urlSafeBase64 } from './hmac'

export const resizeImage = (
  src: string | null | undefined,
  width?: number | string,
  height?: number | string
) => {
  if (!src) return ''
  if (width && height) return `${src}${src.includes('?') ? '&' : '?'}d=${width}x${height}`
  return src
}

const config = {
  resize: {
    key: '81d04ff7ceb59c154647cbb173751d137ec6bf059f30b37d37ec043e4c859639',
    salt: '5a71c31c96ec7650b883aa294d89d1b38e5918bee141b977e18db43fc09552bc',
    domain: 'https://i.meeymedia.com',
    domainWatermark: 'https://rs-share.meeymedia.com'
  }
}

export const resizeOnFlyUrl = (resizeBody: IResizeOnFlyOption) => {
  const {
    width,
    height,
    resizingType,
    url,
    gravity,
    watermark = false,
    watermarkOptions = '0.5:ce:0:0:0.2'
  } = resizeBody || {}

  const resizeType = resizingType === 'crop' ? resizingType : `rs:${resizingType}`

  const KEY = config.resize.key
  const SALT = config.resize.salt
  const domain =
    watermark && config.resize.domainWatermark
      ? config.resize.domainWatermark
      : config.resize.domain

  const sourceImage = `s3:/${url}`
  const extension = path.extname(sourceImage)
  const encodedUrl = urlSafeBase64(sourceImage)
  const pathGenerate = watermark
    ? `/${resizeType}:${width}:${height}/g:${gravity}/watermark:${watermarkOptions}/${encodedUrl}${extension}`
    : `/${resizeType}:${width}:${height}/g:${gravity}/${encodedUrl}${extension}`

  const signature = sign(SALT, pathGenerate, KEY)

  return `${domain}/${signature}${pathGenerate}`
}
