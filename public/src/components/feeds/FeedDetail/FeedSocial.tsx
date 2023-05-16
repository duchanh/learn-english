import { useScrollComment } from '@/hooks/comment/useScrollComment'
import FeedSocialVertical from '../FeedSocial/FeedSocialVertical'

const FeedSocial = () => {
  const { onClickComment } = useScrollComment()

  return (
    <div className='absolute top-[174px] -left-[5rem] w-[4rem] bg-transparent hidden md:block'>
      <div className='fixed top-[174px] w-[4rem]'>
        <FeedSocialVertical onClickComment={onClickComment} />
      </div>
    </div>
  )
}

export default FeedSocial
