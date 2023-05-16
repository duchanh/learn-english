import { ImageS3 } from 'Models'
import { STATIC_DOMAIN } from './environment'
export const MEEYSHARE_APP_ICON = `${STATIC_DOMAIN}/images/app-icon.png`
export const CopyIcon = `${STATIC_DOMAIN}/images/social/copy.svg`
export const FacebookIcon = `${STATIC_DOMAIN}/images/social/facebook.svg`
export const MessengerIcon = `${STATIC_DOMAIN}/images/social/messenger.svg`
export const ZaloIcon = `${STATIC_DOMAIN}/images/social/zalo.svg`
export const WhatsAppIcon = `${STATIC_DOMAIN}/images/social/whatsapp.svg`
export const TelegramIcon = `${STATIC_DOMAIN}/images/social/telegram.svg`
export const ViberIcon = `${STATIC_DOMAIN}/images/social/viber.svg`
export const TrendingUpIcon = `${STATIC_DOMAIN}/images/trending_up.png`

export const DefaultThumbnail: ImageS3 = {
  "url": "https://io.meeymedia.com/meeyshare-test/images/2023/04/13/thumbnail-share.1681377753739.jpg",
  "uri": "/meeyshare-test/images/2023/04/13/thumbnail-share.1681377753739.jpg",
  "s3Key": "images/2023/04/13/thumbnail-share.1681377753739.jpg",
  "name": "Thumbnail share.jpg",
  "mimeType": "image/jpeg",
  "size": 2969741,
  "width": 2400,
  "height": 1260
}
