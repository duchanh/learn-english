import { PAGE_ROUTE } from '@/constants/route'
import { STATIC_DOMAIN } from '@/constants/environment'
import Link from 'next/link'
import { useFeedContext } from '@/hooks/feed/useFeed'
import { generateCategoryUrl } from '@/extensions/route'
import { DeviceContext } from '@/context/device.context'
import { useContext } from 'react'
import { SmartBannerContext } from '@/context/smart-banner.context'
import clsx from 'clsx'
import React from 'react'
import { Category } from 'Models'

const FeedBreadcrumb = () => {
  const { categories } = useFeedContext()
  const { isMobile } = useContext(DeviceContext)
  const { showBanner } = useContext(SmartBannerContext)
  return isMobile ? (
    <header
      className={clsx(
        'flex items-center fixed top-0 left-0 h-[44px] w-full px-4 py-3 z-[99] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)]',
        {
          'top-[56px]': showBanner
        }
      )}
    >
      <div className='flex items-center'>
        <Link href={PAGE_ROUTE.HOME} title='Trang chủ'>
          <img src={`${STATIC_DOMAIN}/images/logo-small.png`}  />
        </Link>
        {categories?.map((cate: Category, index: number) => (
          <React.Fragment key={index}>
            <span className='mx-1'>/</span>
            <Link href={generateCategoryUrl(cate)} title={cate.name}>
              {cate.name}
            </Link>
          </React.Fragment>
        ))}
      </div>
    </header>
  ) : (
    <div className='flex mb-4'>
      <Link href={PAGE_ROUTE.HOME} className='mr-1 flex' title='Trang chủ'>
        <i className='ms ms-home text-fs-20 text-grey-400' />
      </Link>
      {categories?.map((cate: Category, index: number) => (
        <React.Fragment key={index}>
          <i className='ms ms-chervon_right text-fs-20 text-grey-400 mr-1' />
          <Link
            href={generateCategoryUrl(cate)}
            title={cate.name}
            className='uppercase text-fs-14 text-grey-400'
          >
            {cate.name}
          </Link>
        </React.Fragment>
      ))}
    </div>
  )
}

export default FeedBreadcrumb
