import { COMMENT_HTML_ID, LOCAL_SCROLL_COMMENT } from '@/constants/key'
import { useEffect } from 'react'
import useLocalStorage from '../useLocalStorage'
import useScroll from '../useScroll'

export const useScrollComment = () => {
  const { onScrollTo } = useScroll()

  const onClickComment = () => {
    onScrollTo(COMMENT_HTML_ID)
  }
  return {
    onClickComment
  }
}

export const useScrollCommentDetail = () => {
  const [storedValue, setValue] = useLocalStorage<any>(LOCAL_SCROLL_COMMENT, false)

  const isClient = typeof window !== 'undefined'

  useEffect(() => {
    if (isClient) {
      const element = isClient ? document.getElementById('button-comment') : null
      if (element && storedValue) {
        element.click()
      }
      setValue(false)
    }
  })
}
