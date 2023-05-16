import { STATIC_DOMAIN } from '@/constants/environment'
import { AuthContext } from '@/context/auth.context'
import { useContext } from 'react'
const BlockLogin = () => {
  const { isLoggedIn, login } = useContext(AuthContext)
  return (
    <>
      {!isLoggedIn ? (
        <div className='bg-white shadow-[0px_0px_3px_rgba(0,0,0,0.1)] rounded-[8px] py-4 mb-5'>
          <img src={`${STATIC_DOMAIN}/images/llus.png`} className='w-full mb-4' />
          <div className='text-fs-14 text-grey-800 mb-[18px] px-3 text-center'>
            Đăng nhập để Meey Share giúp bạn <br /> cá nhân hóa và chia sẻ quan điểm tốt hơn
          </div>
          <div className='flex items-center justify-center'>
            <div onClick={login} className='flex items-center justify-center  bg-primary-400 rounded-[8px] p-3 h-[40px] cursor-pointer'>
              <i className='ms ms-account_circle text-fs-20 text-white mr-2' />
              <div className='text-white text-fs-14 font-medium'>Đăng nhập ngay</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default BlockLogin
