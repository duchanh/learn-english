import LayoutFeeds from '@/components/layouts/LayoutFeeds'
import { STATIC_DOMAIN } from '@/constants/environment'
import Link from 'next/link'
const Page404 = () => {
  return (
    <LayoutFeeds>
      <div className='flex flex-col justify-center items-center mt-4'>
        <img className='mb-8 w-full rounded-lg' src={`${STATIC_DOMAIN}/images/404.gif`} />
        <div className='text-fs-24 font-semibold mb-4'>Không tìm thấy trang!</div>
        <div className='mb-4'>Đường dẫn bạn vừa truy cập không tồn tại.</div>
        <Link href='/'>
          <div className='bg-primary-500 text-white p-4 rounded-lg'>Trang chủ</div>
        </Link>
      </div>
    </LayoutFeeds>
  )
}

export default Page404
