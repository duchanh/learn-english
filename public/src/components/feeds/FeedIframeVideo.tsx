import { getFeedVideoEmbed } from '@/extensions/feed'
import clsx from 'clsx'

const FeedIframeVideo = ({ video, title, className }: any) => {
  return video ? (
    <iframe
      className={clsx('!border-none mx-auto aspect-video w-full', className)}
      src={getFeedVideoEmbed(video?.url)}
      title={title}
    />
  ) : null
}

export default FeedIframeVideo
