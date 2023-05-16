import { Category, Feed } from 'Models'
import { MEEY_SHARE_URL } from '@/constants/environment'
import { PAGE_ROUTE } from '@/constants/route'

export const getCanonicalUrl = (router: any) => {
  return (MEEY_SHARE_URL + (router.asPath === '/' ? '' : router.asPath)).split('?')[0] || ''
}

export const generateCanonicalUrl = (canonicalUrl: string) => {
  if (!canonicalUrl) return PAGE_ROUTE.HOME
  return `${MEEY_SHARE_URL}${getPathWithSolidus(canonicalUrl)}`
}

export const getPathWithSolidus = (path: string) => {
  return path.startsWith('/') ? path : `/${path}`
}

export const generateFeedUrl = (feed: Feed) => {
  if (!feed || !feed?.code) return PAGE_ROUTE.HOME
  return generateFeedUrlByCode(feed.code)
}

export const generateFeedUrlByCode = (code: number) => {
  if (!code) return PAGE_ROUTE.HOME
  return `${PAGE_ROUTE.FEED}/${code}`
}

export const generateFeedWithDomain = (feed: Feed) => {
  const feedUrl = generateFeedUrl(feed)
  return generateCanonicalUrl(feedUrl)
}

export const generateCategoryUrl = (category: Category) => {
  if (!category || !category?.slug) return PAGE_ROUTE.HOME
  return getPathWithSolidus(category?.slug)
}
