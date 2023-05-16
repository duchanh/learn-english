import FeedItem from '@/components/feeds/FeedItem'

const FeedSeoList = ({ feeds }: { feeds: any }) => {
  return (
    <div className='hidden'>
      {feeds?.map((item, index) => (
        <FeedItem feed={item} key={index} />
      ))}
    </div>
  )
}

export default FeedSeoList
