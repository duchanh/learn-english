const feedNearYouImage = 'images/feed-near-you.png'
interface ButtonNearYouProps {
  getFeedNearYou: () => void
}
const ButtonNearYou = (props: ButtonNearYouProps) => {
  const { getFeedNearYou } = props
  return (
    <div className='flex flex-col items-center p-4'>
      <img src={feedNearYouImage} className='mb-5' alt='MeeyShare' width={269} height={155} />
      <div className='text-fs-14 text-grey-700 mb-3'>
        Cập nhật ngay tin tức xung quanh vị trí của bạn
      </div>
      <div
        className='cursor-pointer py-3 px-4 text-fs-14 rounded-[2.5rem] bg-primary-400 text-white'
        onClick={getFeedNearYou}
      >
        Xem tin gần bạn
      </div>
    </div>
  )
}

export default ButtonNearYou
