import clsx from 'clsx'
import MeeyButton from '../Button/MeeyButton'
import BaseModal from './BaseModal'

interface ModalCancelPostProps {
  open: boolean
  forceScroll?: boolean
  onClose: () => void
  onCloseAll: () => void
}

const ModalCancelPost = (props: ModalCancelPostProps) => {
  const { open, onClose, onCloseAll, forceScroll } = props
  const handleCloseModal = () => {
    onClose()
  }

  const handleCloseAll = () => {
    onCloseAll()
  }


  return (
    <BaseModal
      modalTitle='Bỏ bài viết'
      open={open}
      forceScroll={forceScroll}
      onClose={handleCloseModal}
      modalWrapperClassName='!w-[20rem]'
      bodyClassname='px-4 py-6'
    >
      <div>
        <div className='text-center mb-4'> Sau khi bỏ, bài đang viết sẽ bị hủy. </div>
        <div className='flex items-center justify-between space-x-4 mt-4'>
          <MeeyButton
            btnType='outline'
            color='secondary'
            className={clsx('flex items-center justify-center w-full')}
            aria-label='btn-accept'
            onClick={handleCloseModal}
          >
            <span>Tiếp tục nhập</span>
          </MeeyButton>

          <MeeyButton
            btnType='filled'
            color='danger'
            className={clsx('flex items-center justify-center w-full')}
            aria-label='btn-cancel'
            onClick={handleCloseAll}
          >
            <span>Bỏ</span>
          </MeeyButton>
        </div>
      </div>
    </BaseModal>
  )
}

export default ModalCancelPost
