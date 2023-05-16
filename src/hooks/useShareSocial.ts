import isEqual from 'lodash.isequal'
import { isMobile } from 'react-device-detect'
import { generateFeedWithDomain } from '@/extensions/route'
import { Feed } from 'Models'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import usePrevious from './usePrevious'

const useShareSocial = ({
  feed: currentFeed,
  onCloseButtonSheet
}: {
  feed: Feed
  onCloseButtonSheet?: () => void
}) => {
  const [feed, setFeed] = useState(currentFeed)
  const [showToolTip, setShowToolTip] = useState(false)
  const [showOtherSocial, setShowOtherSocial] = useState(false)

  const shareUrl = generateFeedWithDomain(feed)

  const isClient = typeof window !== 'undefined'

  const width = 760
  const height = 760
  const left = isClient ? (screen.width - width) / 2 : 0
  const top = isClient ? (screen.height - height) / 2 : 0

  const shareFacebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
  const shareWhatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`
  const shareZaloUrl = `${shareUrl}`
  const previousFeed = usePrevious(currentFeed)

  useEffect(() => {
    if (currentFeed && !isEqual(previousFeed, currentFeed)) setFeed(currentFeed)
  }, [currentFeed])

  const onShareFacebook = () => {
    if (isClient && window) {
      window.open(
        shareFacebookUrl,
        'facebook-share-dialog',
        `width=${width},height=${height},top=${top},left=${left}`
      )
    }
  }

  const onShareWhatsapp = () => {
    if (isClient && window) {
      window.open(
        shareWhatsappUrl,
        '',
        `resizable=yes,width=${width},height=${height},top=${top},left=${left}`
      )
    }
  }

  const onCopy = () => {
    if (isClient && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        if (!isMobile) {
          setTimeout(() => setShowToolTip(false), 1500)
          setShowToolTip(true)
        } else {
          if (onCloseButtonSheet) {
            onCloseButtonSheet()
            toast.success('Sao chép thành công')
          }
        }
        return
      })
    }
  }

  return {
    showToolTip,
    showOtherSocial,
    shareUrl,
    shareZaloUrl,
    onCopy,
    onShareWhatsapp,
    onShareFacebook,
    setShowToolTip,
    setShowOtherSocial
  }
}

export default useShareSocial
