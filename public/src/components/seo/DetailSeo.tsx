import { Meta } from '@/components/layouts/Meta'
import { useFeedContext } from '@/hooks/feed/useFeed'
import { initOgImages } from '@/extensions/images'
import { stripHtml } from '@/utils/html'

const DetailSeo = () => {
  const {
    thumbnail,
    metaDescription,
    metaKeyword,
    metaTitle,
    feedTitle,
    description,
    publishedAt,
    comment
  } = useFeedContext() || {}
  const commentShareTitle = stripHtml(comment).length > 200 ? `${stripHtml(comment).slice(0, 200)}...` : comment
  const detailMetaTitle = `${metaTitle || feedTitle || commentShareTitle} - Meey Share`

  const detailMetaDescription = metaDescription || description || ''
  let detailMetaDescriptionFinal = stripHtml(detailMetaDescription)
  detailMetaDescriptionFinal = detailMetaDescriptionFinal.length > 200 ? `${detailMetaDescriptionFinal.slice(0, 200)}...` : detailMetaDescriptionFinal
  const ogImage = initOgImages(thumbnail, detailMetaTitle, true)
  return (
    <Meta
      title={detailMetaTitle}
      description={detailMetaDescriptionFinal}
      openGraph={{
        type: 'article',
        article: {
          publishedTime: publishedAt,
          modifiedTime: publishedAt,
          authors: ['https://www.facebook.com/meeyland.global/']
        }
      }}
      additionalMetaTags={[
        {
          name: 'keywords',
          content: metaKeyword
        },
        {
          property: 'fb:pages',
          content: '148873268971895'
        },
        {
          property: 'twitter:creator',
          content: '@meey_share'
        },
        {
          property: 'twitter:title',
          content: detailMetaTitle || ''
        },
        {
          property: 'twitter:description',
          content: detailMetaDescription || ''
        },
        {
          property: 'twitter:image',
          content: ogImage?.[0]?.url
        },
        {
          property: 'twitter:image:width',
          content: `${ogImage?.[0]?.width}`
        },
        {
          property: 'twitter:image:height',
          content: `${ogImage?.[0]?.height}`
        },
        {
          property: 'og:locale:alternate',
          content: 'vi_VN'
        },
        {
          property: 'og:rich_attachment',
          content: 'true'
        }
      ]}
      ogImage={ogImage}
    />
  )
}

export default DetailSeo
