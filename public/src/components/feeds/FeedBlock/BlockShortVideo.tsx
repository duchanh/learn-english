import CardFeed from '../CardFeed'
import Slider from 'react-slick'
import { Feed } from 'Models'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { DeviceContext } from '@/context/device.context'
import { useContext } from 'react'
import size from '@/constants/size'
import MeeyImage from '@/components/common/MeeyImage'
import { DefaultThumbnail } from '@/constants/images'
interface BlockShortVideoProps {
  feeds: Array<Feed>
}
const BlockShortVideo = (props: BlockShortVideoProps) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    swipe: true,
    swipeToSlide: true,
    draggable: true,
    variableWidth: true
  }
  const { feeds } = props
  const { isMobile } = useContext(DeviceContext)
  return (
    <CardFeed>
      <div className='flex items-center mb-4'>
        <i className='ms ms-video_cam text-fs-20 text-purple-500' />
        <div className='ml-2 text-grey-800 text-fs-18 font-semibold'>Video ngắn</div>
      </div>

      <div>
        <Slider {...settings} className='video-slick'>
          {feeds?.map((item, key: number) => (
            <div
              className='relative w-full h-full px-1 mb:px-2 rounded-lg md:rounded-[12px] overflow-hidden'
              key={key}
            >
              <MeeyImage
                className='object-cover'
                src={item.thumbnail ? item.thumbnail?.uri : DefaultThumbnail.uri}
                resizeOnFly={item?.thumbnail?.uri ? true : false}
                width={isMobile ? size.video.mobile.width : size.video.desktop.width}
                height={isMobile ? size.video.mobile.height : size.video.desktop.height}
              />
              <div className='absolute bottom-[12px] px-3 line-clamp-2 text-white font-medium text-base'>
                {item?.title}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </CardFeed>
  )
}

export default BlockShortVideo
