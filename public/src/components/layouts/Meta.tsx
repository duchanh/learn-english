import { AppConfig } from '@/constants/app-config'
import { STATIC_DOMAIN, FB_APP_ID, SEO_NO_INDEX, SEO_NO_FOLLOW } from '@/constants/environment'
import { DefaultThumbnail } from '@/constants/images'
import { castToArray } from '@/extensions/array'
import { initOgImages } from '@/extensions/images'
import { NextSeo } from 'next-seo'
import Head from 'next/head'

export interface IogImageUrl {
  url: string
  width?: number
  height?: number
  alt?: string
}

interface IMetaProps {
  title: string
  description: string
  canonical?: string
  ogImage?: IogImageUrl | IogImageUrl[]
  noindex?: boolean
  nofollow?: boolean
  additionalMetaTags?: any[]
  openGraph?: any
}

const Meta = ({
  ogImage,
  noindex,
  nofollow,
  additionalMetaTags,
  title = 'Meey Share - Hơn cả một tờ báo',
  description = 'Nền tảng thông tin bất động sản đa chiều ứng dụng công nghệ AI',
  canonical,
  openGraph
}: IMetaProps) => {
  const ogImages = initOgImages(DefaultThumbnail, title, false)

  return (
    <>
      <Head>
        <meta charSet='UTF-8' key='charset' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href={`${STATIC_DOMAIN}/images/favicon/apple-touch-icon.png`}
          key='apple'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href={`${STATIC_DOMAIN}/images/favicon/favicon-32x32.png`}
          key='icon32'
        />
        <link rel='shortcut icon' href={`${STATIC_DOMAIN}/images/favicon/favicon.ico`} />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href={`${STATIC_DOMAIN}/images/favicon/favicon-16x16.png`}
          key='icon16'
        />
        <link rel='icon' href={`${STATIC_DOMAIN}/images/favicon/favicon.ico`} key='favicon' />
        <link rel='manifest' href={`${STATIC_DOMAIN}/images/favicon/site.webmanifest`} />
        <meta httpEquiv='Content-Security-Policy' content='upgrade-insecure-requests' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black' />
        <meta name='referrer' content='no-referrer-when-downgrade' />
        <meta
          name='google-site-verification'
          content='SuaTD4nlsqJNqec4mrITCW_4WqVK4bNwH3JGcQd45o0'
        />
      </Head>
      <NextSeo
        noindex={noindex || SEO_NO_INDEX}
        nofollow={nofollow || SEO_NO_FOLLOW}
        additionalMetaTags={additionalMetaTags}
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          title: title,
          description: description,
          url: canonical,
          site_name: AppConfig.site_name,
          locale: AppConfig.locale,
          type: 'website',
          article: {
            authors: ['https://www.facebook.com/meeyland.global/']
          },
          images: castToArray(ogImage ? ogImage : ogImages),
          ...(openGraph || {})
        }}
        facebook={{ appId: FB_APP_ID }}
        twitter={{ site: '@meey_share' }}
      />
    </>
  )
}

export { Meta }
