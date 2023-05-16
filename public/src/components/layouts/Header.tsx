import { STATIC_DOMAIN } from '@/constants/environment'
import { PAGE_ROUTE } from '@/constants/route'
import { useAuth } from '@/hooks/useAuth'
import { resizeImage } from '@/utils/images'
import Link from 'next/link'
import Avatar from '../common/Avatar'
import PopOver from '../common/PopOver'
import SmartBannerApp from './SmartBannerApp'
import { DeviceContext } from '@/context/device.context'
import { useContext } from 'react'

const Header = () => {
  const { login, logout, user, accessToken } = useAuth()
  const { isMobile } = useContext(DeviceContext)
  return (
    <header id="header" className='fixed top-0 left-0 w-full z-10 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)]'>
      {isMobile ? <SmartBannerApp /> : null}
      <div className='flex justify-between items-center px-4 py-3 w-full h-[44px] md:h-[56px]'>
        <Link href={PAGE_ROUTE.HOME} title="Trang chủ">
          <img src={`${STATIC_DOMAIN}/images/logo.svg`} alt='logo' width='133' height='29' />
        </Link>
        <div className='flex items-center'>
          {!!accessToken ? (
            <PopOver
              position='bottom-right'
              content={
                <div className='w-[300px] bg-white meey-dropdown-user'>
                  <div className='cursor-pointer px-3 text-sm text-grey-800 flex items-center whitespace-nowrap h-[52px] border-b border-grey-50'>
                    <Avatar
                      className='text-base mr-2'
                      avatar={resizeImage(user?.avatar, 36, 36) || ''}
                      username={user?.name || ''}
                      size={36}
                    />
                    <div className='flex flex-col'>
                      <div className='line-clamp-1 word-break whitespace-pre-line'>{user.name}</div>
                    </div>
                  </div>
                  <div className='w-full h-[1px] bg-grey-50'></div>
                  <div className='cursor-pointer px-3 text-sm text-grey-800 flex items-center whitespace-nowrap h-10 border-t border-grey-50'>
                    <i className='ms ms-settings text-base text-grey-400 mr-2'></i> Quản lý thông
                    tin cá nhân{' '}
                    <i className='ms ms-chervon_right text-base text-grey-400 ml-auto'></i>
                  </div>
                  <div
                    className='cursor-pointer px-3 text-sm text-grey-800 flex items-center whitespace-nowrap h-10'
                    onClick={logout}
                  >
                    <i className='ms ms-logout text-base text-grey-400 mr-2'></i> Đăng xuất{' '}
                    <i className='ms ms-chervon_right text-base text-grey-400 ml-auto'></i>
                  </div>
                </div>
              }
            >
              <div className='flex items-center'>
                <Avatar
                  className='text-base mr-2'
                  avatar={resizeImage(user?.avatar, 36, 36) || ''}
                  username={user?.name || ''}
                  size={36}
                />
                <i className='ms ms-chervon_down' />
              </div>
            </PopOver>
          ) : (
            <div className='flex items-center cursor-pointer' onClick={login}>
              <i className=' ms ms-account_circle text-fs-20 ml-auto text-primary-400 mr-1'></i>
              <span className='text-fs-14 text-primary-500'>Đăng nhập</span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
export default Header
