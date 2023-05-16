import Tippy from '@tippyjs/react'
import { useState, useContext } from 'react'
import ModalReport from '@/components/common/Modal/ModalReport'
import { Feed } from 'Models'
import { AuthContext } from '@/context/auth.context'

interface FeedMoreProps {
  feed: Feed
}

const FeedMore = (props: FeedMoreProps) => {
  const { isLoggedIn, token, login } = useContext(AuthContext)
  const { feed } = props
  const [openModal, setOpenModal] = useState(false)
  const [visible, setVisible] = useState(false)
  const onReportFeed = () => {
    if (isLoggedIn) {
      setVisible(false)
      setOpenModal(true)
    } else {
      login()
    }
  }
  return (
    <>
      <Tippy
        placement='bottom-end'
        visible={visible}
        content={
          <div className='bg-white rounded-lg shadow-[0px_5px_15px_1px_rgba(0,0,0,0.1);]'>
            <div
              className='flex items-center justify-center cursor-pointer p-4'
              onClick={onReportFeed}
            >
              <i className='ms ms-report text-grey-400 text-base' />
              <div className='ml-2 text-grey-800 text-fs-14 '>Báo cáo bài đăng</div>
            </div>
          </div>
        }
        onClickOutside={() => setVisible(false)}
        interactive={true}
        zIndex={9}
        className='min-w-[200px]'
      >
        <div className='cursor-pointer' onClick={() => setVisible(true)}>
          <i className='ms ms-more_horiz text-fs-20 text-grey-400' />
        </div>
      </Tippy>
      <ModalReport open={openModal} onClose={() => setOpenModal(false)} feedId={feed._id} />
    </>
  )
}

export default FeedMore
