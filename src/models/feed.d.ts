declare module 'Models' {
  interface FeedThumb extends ImageS3 {
    name: string
    url: string
  }

  interface FeedSource {
    domain: string
    logo: string
  }

  interface FeedVideo {
    url: string
  }
  export interface Feed extends BaseSeo {
    _id: string
    link: string
    title: string
    content: string
    thumbnail: ImageS3
    totalView: number
    status: number
    categories: Array<Category>
    publishedBy: UserPublishBy
    comment: string
    description: string
    source: FeedSource
    summary: string
    publishedAt: string
    code: number
    feedsRelated: RelatedFeed[]
    locationAI: any
    crawlId: string
    type?: FeedTypeEnum
    video?: FeedVideo
    interaction?: InteractionFeed
  }

  export interface RelatedFeed extends Omit<Feed, ['feedsRelated', 'locationAI', 'crawlId']> { }

  export interface InteractionFeedStyle {
    styleUpButton?: string
    styleDownButton?: string
    styleText?: string
  }

  export interface InteractionFeed {
    feed: string
    upVoteCount?: number
    totalVotes?: number
    totalComments?: number
    voteType?: VoteTypeEnum
    styles?: InteractionFeedStyle
    [key]?: any
  }

  export interface FeedSocialProps {
    feed?: Feed
    className?: string
    isDetailPage?: boolean
    onClickComment?: () => void
  }

  export interface FeedOGP {
    metaTitle?: string
    metaDescription?: string
    icon?: string
    metaImage?: string
    metaKeyword?: string
    url?: string
  }
}
