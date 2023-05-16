import FeedList from '@/components/feeds/FeedList'
import FeedListAdded from '@/components/feeds/FeedListAdded'
import LayoutFeeds from '@/components/layouts/LayoutFeeds'
import HomeSeo from '@/components/seo/HomeSeo'
import BlockLogin from '@/components/feeds/FeedBlock/BlockLogin'
import BlockActiveMember from '@/components/feeds/FeedBlock/BlockActiveMember'
import PostFeedInput from '@/components/feeds/PostFeed/PostFeedInput'
import { Feed } from 'Models'
import FeedSeoList from '@/components/feeds/FeedSeoList'
import ReactPlayer from 'react-player/lazy'
interface HomePageProps {
  feedsSeoList?: Array<Feed>
}

const HomePage = (props: HomePageProps) => {
  const { feedsSeoList } = props
  return (
    <LayoutFeeds>
      <HomeSeo
        title='Meey Share - Mạng xã hội thông tin bất động sản đa chiều ứng dụng công nghệ AI'
        description='Mang đến trải nghiệm đọc và chia sẻ tin tức bất động sản cá nhân hoá cho người dùng bằng việc áp dụng công nghệ AI. Hướng tới, trở thành nền tảng mạng xã hội chia sẻ tin tức bất động sản cá nhân hoá đa chiều lớn nhất tại Đông Nam Á'
      />
      <div className='flex'>
        <div className='md:w-[586px]'>
          <PostFeedInput />
          <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
          <FeedListAdded />
          <FeedSeoList feeds={feedsSeoList}/> 
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

export default HomePage
