import { STATIC_DOMAIN } from '@/constants/environment'
import FeedBlockItem from './FeedBlockItem'
import { DeviceContext } from '@/context/device.context'
import { useContext } from 'react'
import clsx from 'clsx'
import { FeedTrendingMock } from '@/constants/mock'

const BlockTrending = () => {
  const { isMobile } = useContext(DeviceContext)

  const data = FeedTrendingMock

  return data && data.length > 0 ? (
    <div
      className={clsx({
        'w-[18rem] bg-transparent': !isMobile,
        'p-4 bg-light-blue mb-2 ': isMobile
      })}
    >
      <div>
        <div className='flex items-center mb-3 border-b-[1px] border-grey-100 border-solid border-x-0 border-t-0 pb-3 md:border-0'>
          <img
            src={`${STATIC_DOMAIN}/images/trending_up.png`}
            width={20}
            height={20}
            alt='trending-up'
          />
          <div className='ml-2 text-fs-18 text-grey-800 font-semibold'>Xu hướng</div>
        </div>

        <div>
          {data?.map((item: any, index: number) => {
            return (
              <FeedBlockItem feed={item} key={item._id} isSideBlock={isMobile ? false : true} />
            )
          })}
        </div>
      </div>
    </div>
  ) : null
}

export default BlockTrending
