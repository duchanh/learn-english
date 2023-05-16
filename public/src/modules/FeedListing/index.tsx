import FeedList from '@/components/feeds/FeedList'
import LayoutFeeds from '@/components/layouts/LayoutFeeds'
import HomeSeo from '@/components/seo/HomeSeo'
import CategoryPageTitle from '@/components/feeds/FeedBlock/CategoryPageTitle'
import BlockLogin from '@/components/feeds/FeedBlock/BlockLogin'
import BlockActiveMember from '@/components/feeds/FeedBlock/BlockActiveMember'

const Feeds = () => {
  return (
    <LayoutFeeds>
      <HomeSeo
        title='Meey Share - Mạng xã hội thông tin bất động sản đa chiều ứng dụng công nghệ AI'
        description='Mang đến trải nghiệm đọc và chia sẻ tin tức bất động sản cá nhân hoá cho người dùng bằng việc áp dụng công nghệ AI. Hướng tới, trở thành nền tảng mạng xã hội chia sẻ tin tức bất động sản cá nhân hoá đa chiều lớn nhất tại Đông Nam Á'
      />
      <div className='flex'>
        <div className='md:w-[586px]'>
          <CategoryPageTitle />
          <FeedList />
        </div>
        <div className='hidden md:block md:sticky top-[80px] h-[calc(100vh-96px)] md:px-4 md:ml-6'>
          <div className='md:w-[300px]'>
            <BlockLogin />
            <BlockActiveMember />
          </div>
        </div>
      </div>
    </LayoutFeeds>
  )
}

export default Feeds
