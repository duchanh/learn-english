import { getRelativeTime } from '@/utils/datetime'
import clsx from 'clsx'

const FeedPublishedBy = ({ feedPublishedBy, publishedAt, className }: any) => {
  return (
    <div className={clsx('flex items-center', className)}>
      <div className='text-fs-14 mr-1 break-words line-clamp-1 word-break whitespace-pre-line'>
        {feedPublishedBy?.fullname}
      </div>
      <div className='flex items-center max-w-full shrink-0'>
        <i className='ms ms-dot_small text-fs-12 text-grey-400' />
        <div className='ml-1 text-grey-500 text-fs-12'>{getRelativeTime(publishedAt)}</div>
      </div>
    </div>
  )
}

export default FeedPublishedBy
