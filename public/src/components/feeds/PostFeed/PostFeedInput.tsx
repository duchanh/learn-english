import Avatar from '@/components/common/Avatar'
import ModalPostFeed from '@/components/common/Modal/ModalPostFeed'
import FeedItem from '@/components/feeds/FeedItem'
import { AuthContext } from '@/context/auth.context'
import { useFeedListing } from '@/hooks/feed/useFeedListing'
import { resizeImage } from '@/utils/images'
import { useContext, useEffect, useState } from 'react'
type FeedItemType = React.ElementRef<typeof FeedItem>


const PostFeedInput = () => {
  const { user, token, login } = useContext(AuthContext)
  const [openModal, setOpenModal] = useState(false)

  const { loadFeedsAdded, isValidating } = useFeedListing<FeedItemType>()

  const [firstLoad, setFirstLoad] = useState(true)
  useEffect(() => {
    if (!isValidating && firstLoad) {
      setFirstLoad(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [isValidating, firstLoad])

  return (
    !firstLoad ?
      <div className='flex items-center py-2 px-4 bg-white shadow-[0px_0px_3px_rgba(0,0,0,0.1)] rounded-[8px] h-[52px] mb-5'>
        {token ? <Avatar
          className='text-base mr-2'
          avatar={resizeImage(user?.avatar, 36, 36) || ''}
          username={user?.name || ''}
          size={36}
        /> : <i className='inline-block ms ms-account_circle text-fs-36 text-primary-400 mr-2'></i>}


        <div
          onClick={() => token ? setOpenModal(true) : login()}
          className='text-fs-14 text-grey-400 cursor-pointer h-full w-full flex items-center flex-[0_auto]'
        >
          Viết bài, chia sẻ quan điểm...
        </div>
        <ModalPostFeed open={openModal} onClose={() => setOpenModal(false)} loadFeedsAdded={loadFeedsAdded} />
      </div>
      : null
  )
}

export default PostFeedInput
