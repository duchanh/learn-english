import { MEEYSHARE_APP_ICON } from '@/constants/images'
import { useRouter } from 'next/router'
import React, { useCallback, useContext } from 'react'
import { isIOS, isAndroid } from 'react-device-detect'
import qs from 'query-string'
import { SmartBannerContext } from '@/context/smart-banner.context'
import { FIREBASE_KEY, FIREBASE_DOMAIN_URI } from '@/constants/environment'
  import { FirebaseDynamicLinks } from 'firebase-dynamic-links'

const SmartBannerApp = () => {
  const { push } = useRouter()
  const { onRemoveBanner, showBanner } = useContext(SmartBannerContext)

  const onRedirectApp = useCallback(async () => {
    const firebaseDynamicLinks = new FirebaseDynamicLinks(FIREBASE_KEY)
    const { shortLink } = await firebaseDynamicLinks.createLink({
      dynamicLinkInfo: {
        domainUriPrefix: FIREBASE_DOMAIN_URI,
        link: window.location.href,
        androidInfo: {
          androidPackageName: 'com.meeyshare.app',
        },
        iosInfo: {
          iosBundleId: 'com.meeyshare.app',
          iosAppStoreId: "6446888860",
        },
      },
    });
    console.log('shortLink', shortLink)
    push(shortLink)
  }, [])

  return showBanner ? (
    <div className='py-3 px-2.5 bg-light-blue flex items-center justify-between lg:hidden'>
      <div className='flex items-center'>
        <i className='ms ms-close text-grey-400 text-fs-16 mr-1' onClick={onRemoveBanner} />

        <img src={MEEYSHARE_APP_ICON} width={28} height={28} className='h-[1.75rem]' />
        <div className='ml-2 text-fs-12 text-grey-700'>
          <span className='text-fs-800 font-semibold text-grey-800'>Meey Share</span> - Nền tảng chia sẻ tin tức bất động sản cá nhân hóa ứng dụng AI.
        </div>
      </div>
      <div
        className='flex items-center justify-center py-1 rounded-[24px] font-medium bg-primary-500 text-fs-10 text-white tracking-[0.5px] min-w-[58px]'
        onClick={onRedirectApp}
      >
        MỞ APP
      </div>
    </div>
  ) : null
}

export default SmartBannerApp
