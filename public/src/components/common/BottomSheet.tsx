import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'clsx'
import { CSSTransition } from 'react-transition-group'
import { useOverflowLayout } from '@/hooks/useLayout'
interface SheetProps {
  /**
   * Component's HTML Element
   *
   * @default 'div'
   */
  component?: string
  /**
   * Object with Tailwind CSS colors classes
   * */
  colors?: {
    /**
     *
     * @default 'bg-white dark:bg-black'
     */
    bgIos?: string
    /**
     *
     * @default 'bg-md-light-surface dark:bg-md-dark-surface'
     */
    bgMaterial?: string
  }

  /**
   * Allows to open/close Sheet modal and set its initial state
   *
   * @default false
   */
  opened?: boolean
  /**
   * Enables Sheet modal backdrop (dark semi transparent layer behind)
   *
   * @default true
   */
  backdrop?: boolean
  /**
   * Click handler on backdrop element
   */
  onBackdropClick?: () => void
  onOpen?: (e: any) => void
  className?: string
  children?: React.ReactNode
  title?: string
  closable?: boolean
  overlap?: boolean
  fullscreen?: boolean
  icon?: string
  titleClass?: string
  wrapperClass?: string
}
//@ts-ignore
const Sheet = forwardRef((props: SheetProps, ref: any) => {
  const {
    title,
    closable = true,
    className,
    colors: colorsProp,

    opened,
    backdrop = true,
    onBackdropClick,
    onOpen,

    // Children
    children,
    overlap,
    fullscreen,
    icon = 'ml-west',
    titleClass = 'shadow-divide text-center',
    wrapperClass,
    // Rest
    ...rest
  } = props

  const elRef = useRef(null)

  useImperativeHandle(ref, () => ({
    el: elRef.current
  }))

  const attrs = {
    ...rest
  }

  useOverflowLayout(opened)

  return typeof window === 'undefined'
    ? null
    : ReactDOM.createPortal(
        //@ts-ignore
        <CSSTransition
          in={opened}
          timeout={300}
          classNames='popup'
          unmountOnExit
          onEnter={onOpen}
          onExited={onBackdropClick}
        >
          <>
            {!fullscreen && backdrop && (
              <div
                className={classNames(
                  'fixed w-full h-full min-h-screen left-0 top-0 backdrop duration-400',
                  {
                    'opacity-0 pointer-events-none': !opened,
                    'z-50': overlap,
                    'z-[9999]': !overlap
                  }
                )}
                onClick={onBackdropClick}
              />
            )}
            <div className='min-h-screen'>
              <div
                ref={elRef}
                className={classNames({
                  'left-0 top-full transition-transform duration-400 overflow-hidden fixed rounded-t-3xl ease-material-in w-full':
                    !fullscreen,
                  'fixed overflow-hidden bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out z-50':
                    fullscreen,
                  '-translate-y-full': opened && !fullscreen,
                  'z-50': overlap,
                  'z-[9999]': !overlap
                })}
                {...attrs}
              >
                <div
                  className={classNames({
                    'w-full z-40 right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform overflow-y-scroll':
                      fullscreen,
                    'translate-x-0': opened && fullscreen,
                    'translate-x-full': !opened && fullscreen
                  })}
                >
                  {title ? (
                    <div
                      className={classNames(
                        'py-2.5 px-12 text-fs-18 font-medium lg:font-medium relative z-50 text-grey-800',
                        {
                          'bg-light-blue': !fullscreen,
                          'shadow-divide': fullscreen && !titleClass
                        },
                        titleClass
                      )}
                    >
                      {fullscreen && closable ? (
                        <button
                          className='absolute left-4'
                          aria-label='close-bottom-sheet'
                          onClick={onBackdropClick}
                          type='button'
                        >
                          <i className={classNames('ml text-[1.5rem] text-grey-800', icon)} />
                        </button>
                      ) : null}
                      {title}
                      {!fullscreen && closable ? (
                        <div
                          className='flex absolute right-2 top-1/2 -translate-y-1/2'
                          aria-label='close-bottom-sheet'
                          onClick={onBackdropClick}
                        >
                          <i className='ms ms-close text-[1.5rem] text-grey-800' />
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  <div
                    className={classNames(
                      'bg-white z-50 overflow-scroll',
                      {
                        'max-h-[80vh]': !fullscreen,
                        'overflow-y-scroll scrollbar-thin scrollbar-thumb-black-v3 scrollbar-thumb-rounded-full scrollbar-track-rounded-full':
                          fullscreen
                      },
                      wrapperClass
                    )}
                  >
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </>
        </CSSTransition>,
        document.querySelector('body')
      )
})

Sheet.displayName = 'Sheet'

export default Sheet
