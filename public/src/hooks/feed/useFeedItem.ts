import { useRouter } from 'next/router'
import { Feed } from 'Models'
import useTrackingFeed from '@hooks/tracking/useTrackingFeed'
import { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { DeviceContext } from '@/context/device.context'
import { useFeed } from './useFeed'
import useLocalStorage from '../useLocalStorage'
import { LOCAL_SCROLL_COMMENT } from '@/constants/key'

const useFeedItem = (feed: Feed, ref: any) => {
  const router = useRouter()

  const htmlRef = useRef(null)

  const feedTitleRef = useRef(null)

  const { isMobile } = useContext(DeviceContext)

  const [heightTitle, setHeightTitle] = useState(0)

  const [_, setValue] = useLocalStorage<any>(LOCAL_SCROLL_COMMENT, false)

  const { postTrackUser } = useTrackingFeed(feed, false)

  const currentFeed = useFeed(feed)

  const { feedUrl, feedCategory, feedPublishedBy, feedSource } = currentFeed || {}

  const onRedirectFeedDetail = () => {
    router.push(feedUrl)
  }

  const onClickComment = () => {
    setValue(true)
    onRedirectFeedDetail()
  }

  useImperativeHandle(ref, () => {
    return {
      postTrackingItem: async () => {
        try {
          await postTrackUser()
        } catch (error) {}
      },
      offsetTop: htmlRef?.current?.offsetTop,
      offsetHeight: htmlRef?.current?.offsetHeight
    }
  })

  useEffect(() => {
    setHeightTitle(feedTitleRef?.current?.clientHeight)
  }, [feedTitleRef])

  return {
    ...currentFeed,
    feedUrl,
    isMobile,
    heightTitle,
    htmlRef,
    feedTitleRef,
    feedCategory,
    feedPublishedBy,
    feedSource,
    onClickComment,
    onRedirectFeedDetail
  }
}

export default useFeedItem
