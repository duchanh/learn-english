import { Toaster, resolveValue } from 'react-hot-toast'
import { isMobile } from 'react-device-detect'
import clsx from 'clsx'
const Toast = () => {
  return (
    <Toaster
      position={isMobile ? 'bottom-center' : 'top-right'}
      containerStyle={{ top: 60 }}
      toastOptions={{
        success: {
          icon: <i className='ms ms-checked_circle text-success-500 text-[1.25rem]' />
        },
        error: {
          icon: <i className='ms ms-info text-red-500 text-[1.25rem]' />
        }
      }}
    >
      {(t) => (
        <div
          className={clsx(
            'bg-grey-700 rounded-lg shadow-[0_0_20px_rgba(0, 0, 0, 0.2)] text-white text-fs-14 px-2 py-3.5 flex items-start w-full sm:w-auto z-[99999]',
            {
              'animation-fadeToRight': !isMobile,
              'animation-fadeToBottom': isMobile
            }
          )}
        > 
          <div className='mr-2 flex-shrink-0'>{t.icon}</div>
          <div className='line-clamp-2'>{resolveValue(t.message, t)}</div>
        </div>
      )}
    </Toaster>
  )
}

export default Toast
