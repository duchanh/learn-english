import { ZaloIcon } from '@/constants/images'
import clsx from 'clsx'
import { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { isIOS, isMobile, isTablet } from 'react-device-detect'

interface IShareZaloProps {
  url: string
  isHideText?: boolean
  className?: string
  visible?: boolean
}

const DEFAULT_IFRAME_HEIGHT = 352

let timeOutOpenShare: NodeJS.Timeout = null
const ShareZalo = ({ url, isHideText = false, className = '', visible }: IShareZaloProps) => {
  const [shareZaloDestop, setShareZaloDesktop] = useState(false)
  const [heightIframe, setHeightIframe] = useState(DEFAULT_IFRAME_HEIGHT)
  const zaloIframe = useRef<HTMLIFrameElement>(null)
  const buttonZalo = useRef(null)

  const getLinkEncodeZalo = useMemo(() => {
    return btoa(
      JSON.stringify({
        url: url
      })
    )
  }, [url])

  const onMessangePostEvent = useCallback((e: MessageEvent) => {
    switch (e?.data?.cmd) {
      case 'zsdk_close_share':
        zaloIframe.current.style.zIndex = '-1'
        zaloIframe.current.style.display = 'none'
        window.removeEventListener('message', onMessangePostEvent)
        break
      case 'zsdk_open_share':
        setHeightIframe(DEFAULT_IFRAME_HEIGHT)
        clearTimeout(timeOutOpenShare)
        break
      case 'zsdk_share_resize': {
        setHeightIframe(DEFAULT_IFRAME_HEIGHT + e.data.height)
        break
      }
      default: {
        break
      }
    }
  }, [])

  const linkToZalo = useCallback(() => {
    if (!isMobile && !isTablet) {
      setShareZaloDesktop(true)
      zaloIframe.current.style.zIndex = '9'
      zaloIframe.current.style.display = 'block'
      const buttonBoundingTop = buttonZalo.current.getBoundingClientRect().top
      const windowHeight = window.innerHeight
      const buttonOffsetBottom = windowHeight - buttonBoundingTop
      if (buttonOffsetBottom < 360) {
        zaloIframe.current.style.top = '-350px'
      }
      zaloIframe.current.contentWindow.postMessage({ type: 'clickOpenShare' }, '*')
      window.addEventListener('message', onMessangePostEvent)
      timeOutOpenShare = setTimeout(() => {
        zaloIframe.current.style.zIndex = '-1'
        zaloIframe.current.style.display = 'none'
        window.removeEventListener('message', onMessangePostEvent)
      }, 500)
      return
    }
    if (isIOS) {
      location.href = `zaloshareext://shareext?url=${encodeURIComponent(url)}&type=8&version=1`
      return
    }
    location.href = `intent://zaloapp.com/#Intent;action=android.intent.action.SEND;type=text/plain;S.android.intent.extra.SUBJECT=;S.android.intent.extra.TEXT=${encodeURIComponent(
      url
    )};B.hidePostFeed=false;B.backToSource=true;end`
  }, [onMessangePostEvent, url])

  useEffect(() => {
    if (!visible) {
      zaloIframe.current.style.zIndex = '-1'
      zaloIframe.current.style.display = 'none'
    }
  }, [visible])
  return (
    <div
      className={`flex items-center p-3 rounded-lg cursor-pointer  duration-300 hover:bg-light-gray relative ${className}`}
      onClick={linkToZalo}
      ref={buttonZalo}
    >
      <img src={ZaloIcon} className='w-6 h-6' alt='zalo icon' width='24px' height='24px' />
      {!isHideText ? (
        <span className='ml-3 text-fs-14 text-grey-800 font-medium'>Chia sẻ Zalo</span>
      ) : null}
      <iframe
        title='zalo sdk'
        ref={zaloIframe}
        height={heightIframe}
        className={clsx(
          'absolute -z-10 left-0 top-10 w-[30rem]',
          !isMobile && !isTablet && shareZaloDestop ? 'block' : 'hidden'
        )}
        scrolling='no'
        frameBorder='0'
        src={`https://button-share.zalo.me/share_inline?layout=2&color=blue&customize=true&width=0px&height=0px&isDesktop=true&d=${getLinkEncodeZalo}`}
      />
    </div>
  )
}

export default ShareZalo
