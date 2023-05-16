import { FB_APP_ID } from '@/constants/environment'
import { FacebookIcon, MessengerIcon, TelegramIcon, WhatsAppIcon } from '@/constants/images'
import { DeviceContext } from '@/context/device.context'
import useShareSocial from '@/hooks/useShareSocial'
import { Feed } from 'Models'
import { useContext, useEffect } from 'react'
import { FacebookMessengerShareButton, TelegramShareButton } from 'react-share'
import FeedCopyLink from './FeedCopyLink'
import ShareZalo from './ShareZalo'

interface ISharePopover {
  feed: Feed
  visible?: boolean
  onCloseButtonSheet?: () => void
}

const SharePopover = (props: ISharePopover) => {
  const { feed, visible, onCloseButtonSheet } = props
  const { isMobile } = useContext(DeviceContext)

  const {
    shareZaloUrl,
    showToolTip,
    showOtherSocial,
    shareUrl,
    setShowToolTip,
    onShareFacebook,
    onShareWhatsapp,
    setShowOtherSocial,
    onCopy
  } = useShareSocial({ feed, onCloseButtonSheet })

  useEffect(() => {
    if (!visible) {
      setShowToolTip(false)
      setTimeout(() => {
        setShowOtherSocial(false)
      }, 300)
    }
  }, [visible])

  return (
    <>
      <div className='md:bg-white w-full md:w-[15rem] md:p-2 md:shadow-[0px_0px_15px_2px_rgba(0,0,0,0.1)] md:rounded-lg'>
        <div
          className='flex items-center p-3 rounded-lg cursor-pointer duration-300 hover:bg-light-gray'
          onClick={onShareFacebook}
        >
          <img src={FacebookIcon} alt='FacebookIcon' />
          <span className='ml-3 text-fs-14 text-grey-800 font-medium'>Chia sẻ lên Facebook</span>
        </div>

        <ShareZalo url={shareZaloUrl} visible={visible} />

        <FeedCopyLink isMobile={isMobile} showToolTip={showToolTip} onCopy={onCopy} />

        {showOtherSocial ? (
          <>
            <FacebookMessengerShareButton appId={FB_APP_ID} url={shareUrl} className='w-full'>
              <div className='flex items-center p-3 rounded-lg cursor-pointer duration-300 hover:bg-light-gray'>
                <img src={MessengerIcon} alt='MessengerIcon' />
                <span className='ml-3 text-fs-14 text-grey-800 font-medium'>
                  Chia sẻ lên Messenger
                </span>
              </div>
            </FacebookMessengerShareButton>
            <div
              className='flex items-center p-3 rounded-lg cursor-pointer duration-300 hover:bg-light-gray'
              onClick={onShareWhatsapp}
            >
              <img src={WhatsAppIcon} />
              <span className='ml-3 text-fs-14 text-grey-800 font-medium'>
                Chia sẻ lên WhatsApp
              </span>
            </div>
            <TelegramShareButton url={shareUrl} className='w-full'>
              <div className='flex items-center p-3 rounded-lg cursor-pointer duration-300 hover:bg-light-gray'>
                <img src={TelegramIcon} alt='TelegramIcon' />
                <span className='ml-3 text-fs-14 text-grey-800 font-medium'>
                  Chia sẻ lên Telegram
                </span>
              </div>
            </TelegramShareButton>
          </>
        ) : (
          <div
            className='w-full flex md:justify-center items-center cursor-pointer p-3 md:p-0'
            onClick={() => {
              setShowOtherSocial(true)
            }}
          >
            <i className='ms ms-chervon_down md:text-fs-20 text-fs-24 text-grey-800 rounded-[24px] bg-light-gray md:bg-transparent' />
            {isMobile ? (
              <div className='text-fs-14 text-grey-800 font-medium ml-3'>Xem thêm lựa chọn</div>
            ) : null}
          </div>
        )}
      </div>
    </>
  )
}

export default SharePopover
