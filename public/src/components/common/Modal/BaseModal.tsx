import { useOverflowLayout } from '@/hooks/useLayout'
import ClickOutside from '@/vendor/click-outside'
import clsx from 'clsx'

interface BaseModalProps {
  children: React.ReactNode
  open: boolean
  modalTitle: string
  onClose: () => void
  modalWrapperClassName?: string
  bodyClassname?: string
  forceScroll?: boolean
}
const BaseModal = (props: BaseModalProps) => {
  const { children, modalTitle, open = false, onClose, modalWrapperClassName, bodyClassname, forceScroll } = props
  useOverflowLayout(open, forceScroll)
  return (
    <>
      {open ? (
        <div className='z-20 fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto bg-[rgba(0,0,0,0.6)]'>
          <ClickOutside active={open} onClick={onClose}>
            <div className={clsx('relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] rounded-[12px] overflow-hidden', modalWrapperClassName)}>
              <div className='bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.2)] '>
                <div className='relative'>
                  <div className='py-[9px] flex items-center justify-center bg-light-blue text-fs-18 font-semibold'>
                    {modalTitle}
                  </div>
                  <span
                    className='absolute cursor-pointer  top-[11px] right-[16px]'
                    onClick={onClose}
                  >
                    <i className='ms ms-close text-grey-800 text-fs-24' />
                  </span>
                </div>

                <div className={clsx('p-6', bodyClassname)}>{children}</div>
              </div>
            </div>
          </ClickOutside>
        </div>
      ) : null}
    </>
  )
}

export default BaseModal
