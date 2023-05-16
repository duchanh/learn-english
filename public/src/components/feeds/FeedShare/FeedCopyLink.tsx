import Tippy from '@tippyjs/react'
import { CopyIcon } from '@/constants/images'

interface IFeedCopyLinkProps {
  isMobile?: boolean
  showToolTip?: boolean
  onCopy: () => void
}

const FeedCopyLink = (props: IFeedCopyLinkProps) => {
  const { showToolTip, onCopy } = props || {}

  return (
    <Tippy
      content={<div className='text-primary-100 text-fs-12'>Đã sao chép</div>}
      visible={showToolTip}
      className='bg-grey-800 p-2 rounded-lg'
      zIndex={9}
    >
      <div
        className='flex items-center p-3 rounded-lg cursor-pointer duration-300 hover:bg-light-gray'
        onClick={onCopy}
      >
        <img src={CopyIcon} alt='CopyIcon' />
        <span className='ml-3 text-fs-14 text-grey-800 font-medium'>Sao chép liên kết</span>
      </div>
    </Tippy>
  )
}

export default FeedCopyLink
