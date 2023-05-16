import { useState } from 'react'
import Sheet from '@/components/common/BottomSheet'
import SharePopover from './SharePopover'
import { PopOverPositionType } from 'Models'
import Tippy from '@tippyjs/react'

interface IFeedShareButton {
  children: React.ReactNode
  isMobile: boolean
  feed: any
  position?: PopOverPositionType
  wrapperClassName?: string
  className?: string
}

const FeedShareButton = ({ isMobile, feed, children }: IFeedShareButton) => {
  const [visible, setVisible] = useState(false)

  const onOpenModal = () => {
    setVisible(true)
  }
  const onCloseModal = () => {
    setVisible(false)
  }

  return (
    <>
      {isMobile ? (
        <>
          <div className='flex items-center justify-center' onClick={onOpenModal}>
            <i className='ms ms-share_1 text-fs-20 text-primary-400 mr-2' />
            <div className='text-fs-14 text-primary-400 md:text-grey-700'>Chia sẻ</div>
          </div>
          <Sheet opened={visible} onBackdropClick={onCloseModal} title='Chia sẻ'>
            <div className='p-2'>
              <SharePopover feed={feed} onCloseButtonSheet={onCloseModal} />
            </div>
          </Sheet>
        </>
      ) : (
        <Tippy
          content={<SharePopover feed={feed} visible={visible} />}
          visible={visible}
          interactive={true}
          onClickOutside={onCloseModal}
          className='min-w-[15rem]'
          zIndex={9}
        >
          <button className='all-unset' onClick={visible ? onCloseModal : onOpenModal}>
            {children}
          </button>
        </Tippy>
      )}
    </>
  )
}

export default FeedShareButton
