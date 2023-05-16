import ClickOutside from '@/vendor/click-outside'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { PopOverProps } from 'Models'
import CSSTransition from 'react-transition-group/CSSTransition'

const PopOverClickTrigger = ({
  wrapperClassName,
  className,
  children,
  content,
  dropdownClassName,
  open = false,
  position = 'bottom-left',
  onClose,
  onOpen
}: PopOverProps) => {
  const nodeRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(open)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  return (
    <ClickOutside
      active={isOpen}
      onClick={() => {
        setIsOpen(!isOpen)
        onClose && onClose()
      }}
    >
      <div className={clsx('meey-popover', wrapperClassName)}>
        <div
          className={clsx(
            'text-gray popover-trigger cursor-pointer flex items-center rounded',
            className
          )}
          onClick={() => {
            setIsOpen(!isOpen)
            onOpen && onOpen()
          }}
        >
          {children}
        </div>
        <CSSTransition
          in={isOpen}
          nodeRef={nodeRef}
          timeout={200}
          unmountOnExit
          onEnter={onOpen}
          onExited={onClose}
        >
          <div
            className={clsx(
              'popover-overlay p-4',
              isOpen ? 'popover-overlay-open' : '',
              `popover-overlay-${position}`,
              dropdownClassName
            )}
          >
            {content}
          </div>
        </CSSTransition>
      </div>
    </ClickOutside>
  )
}

export default PopOverClickTrigger
