import { useFeedContext } from '@/hooks/feed/useFeed'
import { CopyIcon, FacebookIcon, MessengerIcon } from '@/constants/images'
import ShareZalo from '../FeedShare/ShareZalo'
import Tippy from '@tippyjs/react'
import { FB_APP_ID } from '@/constants/environment'
import { FacebookMessengerShareButton } from 'react-share'
import useShareSocial from '@/hooks/useShareSocial'

const FeedShare = () => {
  const feed = useFeedContext()

  const { showToolTip, shareUrl, shareZaloUrl, onShareFacebook, onCopy } = useShareSocial({ feed })

  return (
    <div className='pb-4 border-b-[1px] border-grey-100 border-solid border-x-0 border-t-0 mb-4'>
      <div className='flex justify-center text-grey-800 text-fs-14 font-medium mb-[18px]'>
        Thấy bài đăng hữu ích? Hãy chia sẻ ngay cho bạn bè nhé!
      </div>
      <div className='flex justify-center'>
        <div
          className='flex items-center p-3 rounded-lg cursor-pointer duration-300 hover:bg-light-gray'
          onClick={onShareFacebook}
          title='Chia sẻ lên Facebook'
        >
          <img src={FacebookIcon} alt='FacebookIcon' width={30} height={30} />
        </div>

        <ShareZalo url={shareZaloUrl} isHideText={true} className='zaolo-share-detail' />

        <Tippy
          content={<div className='text-primary-100 text-fs-12'>Đã sao chép</div>}
          visible={showToolTip}
          className='bg-grey-800 p-2 rounded-lg'
          zIndex={9}
        >
          <div
            className='flex items-center p-3 rounded-lg cursor-pointer duration-300 hover:bg-light-gray'
            onClick={onCopy}
            title='Sao chép liên kết'
          >
            <img src={CopyIcon} alt='CopyIcon' width={30} height={30} />
          </div>
        </Tippy>

        <FacebookMessengerShareButton
          appId={FB_APP_ID}
          url={shareUrl}
          title='Chia sẻ lên Messenger'
        >
          <div className='flex items-center p-3 rounded-lg cursor-pointer duration-300 hover:bg-light-gray'>
            <img src={MessengerIcon} alt='MessengerIcon' width={30} height={30} />
          </div>
        </FacebookMessengerShareButton>
      </div>
    </div>
  )
}

export default FeedShare
