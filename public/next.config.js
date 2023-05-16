/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    STATIC_DOMAIN: process.env.STATIC_DOMAIN,
    MEEY_SHARE_API_URL: process.env.MEEY_SHARE_API_URL,
    MEEEYID_SDK_URL: process.env.MEEEYID_SDK_URL,
    MEDIA_API_URL: process.env.MEDIA_API_URL,
    MEEY_SHARE_URL: process.env.MEEY_SHARE_URL,
    CLIENT_ID: process.env.CLIENT_ID,
    APP_STORE_URL: process.env.APP_STORE_URL,
    PLAY_STORE_URL: process.env.PLAY_STORE_URL,
    FB_APP_ID: process.env.FB_APP_ID,
    SEO_NO_INDEX: process.env.SEO_NO_INDEX,
    SEO_NO_FOLLOW: process.env.SEO_NO_FOLLOW,
    TRACKING_SCROLL_LISTING: process.env.TRACKING_SCROLL_LISTING,
    ONE_SIGNAL_APP_ID: process.env.ONE_SIGNAL_APP_ID,
    ONE_SIGNAL_REST_API_KEY: process.env.ONE_SIGNAL_REST_API_KEY,
    GTM_CODE: process.env.GTM_CODE,
    FIREBASE_KEY: process.env.FIREBASE_KEY,
    FIREBASE_DOMAIN_URI: process.env.FIREBASE_DOMAIN_URI
  },
  compiler: {
    //removeConsole: process.env.NODE_ENV === 'production'
    removeConsole: false
  },
  async rewrites() {
    return [
      {
        source: '/OneSignalSDKWorker.js',
        destination: '/js/OneSignalSDKWorker.js'
      },
      {
        source: '/OneSignalSDKUpdaterWorker.js',
        destination: '/js/OneSignalSDKUpdaterWorker.js'
      }
    ]
  }
  // assetPrefix: process.env.STATIC_DOMAIN ?? null,
}

module.exports = nextConfig
