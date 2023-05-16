import { TRACKING_SCROLL_LISTING } from '@/constants/environment'
import { useEffect, useRef } from 'react'

const useTrackingScroll = <T>() => {
  let currentId = -1
  let timeOutTracking = null

  const listMenuRef = useRef<T[]>([])

  const handleTrackingScroll = () => {
    if (TRACKING_SCROLL_LISTING) {
      clearTimeout(timeOutTracking)
      currentId = listMenuRef.current.findIndex((item: any) => {
        if (item) {
          const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop
          const offsetTop = item.offsetTop
          const offsetHeight = item.offsetHeight
          const limitTop = offsetTop - currentScrollTop
          const limitBottom = offsetTop + offsetHeight - currentScrollTop - window.innerHeight

          return limitTop <= window.innerHeight / 2 && limitBottom >= -window.innerHeight / 2
        } else return false
      })
      if (currentId >= 0) {
        timeOutTracking = setTimeout(() => {
          //@ts-ignore
          listMenuRef.current[currentId]?.postTrackingItem()
        }, 2000)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleTrackingScroll)
    return () => {
      window.removeEventListener('scroll', handleTrackingScroll)
    }
  })

  return {
    listMenuRef
  }
}

export default useTrackingScroll
