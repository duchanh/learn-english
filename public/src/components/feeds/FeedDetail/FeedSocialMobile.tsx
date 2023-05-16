import { FeedContext } from '@/context/feed.context'
import { useScrollComment } from '@/hooks/comment/useScrollComment'
import { useContext } from 'react'
import FeedSocialHorizontal from '../FeedSocial/FeedSocialHorizontal'

const FeedSocialMobile = () => {
  const { feed } = useContext(FeedContext)

  const { onClickComment } = useScrollComment()

  return (
    <div className='sticky md:hidden bottom-4 bg-white max-w-[16.4rem] m-auto left-0 right-0 shadow-comment rounded-l-full rounded-r-full z-[999]'>
      <FeedSocialHorizontal
        feed={feed}
        border={false}
        className='py-3 px-3'
        isDetailPage={true}
        onClickComment={onClickComment}
      />
    </div>
  )
}

export default FeedSocialMobile
