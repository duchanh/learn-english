import React, { useState, useRef, useEffect } from 'react'

import cn from 'clsx'
import TruncateMarkup from 'react-truncate-markup'
import { useRouter } from 'next/router'

export interface ViewMoreContentProps {
  more?: React.ReactNode
  less?: React.ReactNode
  className?: string
  anchorClassName?: string
  lines: number
  viewMoreContent?: React.ReactNode
  viewLessContent?: React.ReactNode
  content?: React.ReactNode
  buttonMobile?: boolean
  showButtonLessContent?: boolean
}

const ViewMoreContent = (props: ViewMoreContentProps) => {
  const { more, less, className, anchorClassName, lines, showButtonLessContent = true } = props
  const ref = useRef(null)

  const { asPath } = useRouter()

  const [expanded, setExpanded] = useState(false)

  const shoreContent = props.viewMoreContent ?? props?.content
  const fullContent = props.viewLessContent ?? props.content

  useEffect(() => {
    setExpanded(false)
  }, [asPath])

  const toggleExpanded = () => {
    if (expanded) {
      // scrollTo
      ref.current?.scrollIntoView({
        behavior: 'smooth'
      })
    }
    setExpanded(!expanded)
  }

  const readMoreEllipsis = () => {
    return (
      <span className={cn(anchorClassName)}>
        ...{' '}
        <span className='mr-1 cursor-pointer' onClick={toggleExpanded}>
          {more ?? 'Xem thêm'}
        </span>
      </span>
    )
  }

  const lessContentEllipsis = () => {
    return (
      <span className={cn(anchorClassName)}>
        <span className='ml-1 cursor-pointer' onClick={toggleExpanded}>
          {less ?? 'Thu gọn'}
        </span>
      </span>
    )
  }

  return (
    <div className={cn(className)} ref={ref}>
      {expanded ? (
        <div style={{ wordBreak: 'break-word' }} className='break-words feed-content'>
          {fullContent}
          {showButtonLessContent ? <>{lessContentEllipsis()}</> : null}
        </div>
      ) : (
        <div className='overflow-hidden feed-content'>
          <TruncateMarkup lines={lines} ellipsis={readMoreEllipsis}>
            <div style={{ wordBreak: 'break-word' }}>{shoreContent}</div>
          </TruncateMarkup>
        </div>
      )}
    </div>
  )
}

export default ViewMoreContent
