import dynamic from 'next/dynamic'

import Header from '@/components/layouts/Header'
import Categories from '@/components/layouts/Categories'
import ContentFooter from '@/components/layouts/ContentFooter'
import { CategoryContext } from '@/context/categories.context'
import className, { clsx } from 'clsx'
import { Category } from 'Models'
import { useContext } from 'react'
import { SmartBannerContext } from '@/context/smart-banner.context'
import Footer from '@/components/layouts/Footer'
const ButtonScrollTop = dynamic(() => import('./ButtonScrollTop'), { ssr: false })
import {DeviceContext} from '@/context/device.context'

interface ILayoutFeeds {
  children: React.ReactNode
  classNames?: String
  categories?: Category[]
  currentCate?: Category
  mainClassName?: string
  hiddenLeftContent?: boolean
  displayNoneLeftContent?: boolean
}

const LayoutFeeds = ({
  classNames,
  children,
  currentCate,
  hiddenLeftContent = false,
  displayNoneLeftContent = false
}: ILayoutFeeds) => {
  const { categories } = useContext(CategoryContext)
  const { showBanner } = useContext(SmartBannerContext)
  const {isMobile} = useContext(DeviceContext)
  return (
    <div className={className(classNames)}>
      <Header />
      <div className='md:flex'>
        <aside
          className={clsx('hidden left-0 top-0 h-screen', {
            'lg:block lg:sticky lg:top-[56px] lg:h-[calc(100vh-56px)] border-r border-solid border-grey-200 border-y-0 border-l-0':
              !hiddenLeftContent,
            'lg:hidden': displayNoneLeftContent,
            'invisible md:block': hiddenLeftContent
          })}
        >
          <div className='pt-8 px-4'>
            <Categories categories={categories} currentCate={currentCate} />
          </div>
        </aside>

        <main
          className={clsx(
            `mt-11 md:mt-[80px] md:mx-auto relative min-h-[calc(100vh-80px)]`,
            classNames,
            {
              'mt-[100px] md:mt-[132px]': showBanner && isMobile
            }
          )}
        >
          {children}
        </main>
        <ButtonScrollTop />
      </div>
      <Footer />
    </div>
  )
}

export default LayoutFeeds
