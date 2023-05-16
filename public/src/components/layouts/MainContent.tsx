import clsx from 'clsx'
import { SmartBannerContext } from '@/context/smart-banner.context'
import { useContext } from 'react'

interface IMainContent {
  children: React.ReactNode
  classNames?: String
}
const MainContent = ({ children, classNames }: IMainContent) => {
  const { showBanner } = useContext(SmartBannerContext)
  return (
    <main className={clsx(`md:mt-[68px] mt-11 md:w-[36.625rem] md:mx-auto relative`, classNames, {
      'mt-[100px]': showBanner
    })}>
      {children}
    </main>
  )
}

export default MainContent
