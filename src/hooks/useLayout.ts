import { useLayoutEffect, useRef } from 'react'

export const useOverflowLayout = (disableScroll?: boolean, forceScroll?: boolean) => {
  const prevBodyOverflowStyle = useRef(null)
  const prevBodyTouchAction = useRef(null)

  if (typeof window !== 'undefined') {
    useLayoutEffect(() => {
      const scrollBarCompensation = window.innerWidth - document.body.offsetWidth
      if (disableScroll) {
        // document.querySelector('body').classList.add('overflow-hidden')

        prevBodyOverflowStyle.current = document.body.style.overflow
        prevBodyTouchAction.current = document.body.style.touchAction
        document.getElementById('header').style.width = `calc(100% - ${scrollBarCompensation}px)`
        document.body.style.setProperty('overflow', 'hidden', 'important')
        document.body.style.width = `calc(100% - ${scrollBarCompensation}px)`
        document.body.style.touchAction = 'none'
      }

      if (forceScroll) {
        document.body.style.overflow = 'auto'
        document.body.style.touchAction = 'auto'
      }


      return () => {
        if (disableScroll) {
          document.body.style.overflow = prevBodyOverflowStyle.current || ''
          document.body.style.touchAction = prevBodyTouchAction.current || ''
          document.body.style.width = ''
          document.getElementById('header').style.width = ''
          // setTimeout(() => {
          //   // document.querySelector('body').classList.remove('overflow-hidden')
          //   document.body.style.width = ''
          // }, 300)
        }

        if (forceScroll) {
          document.body.style.overflow = 'auto'
          document.body.style.touchAction = 'auto'
        }
      }
    }, [disableScroll, forceScroll])

    // useLayoutEffect(() => {
    //   document.querySelector('body').classList.remove('overflow-hidden')
    // }, [])
  }
}
