import Avatar from '@/components/common/Avatar'
import sizeConstants from '@/constants/size'
const listActiveMember = [
  {
    avatar: '',
    fullname: 'Ngô Thu Thảo',
    coundFeed: 250,
  },
  {
    avatar: '',
    fullname: 'Ninh Văn Hưng',
    coundFeed: 200
  },
  {
    avatar: '',
    fullname: 'Hoàng Phương Anh',
    coundFeed: 100
  }
]
const ActiveMemberItem = (props) => {
  const { member, memberIndex } = props
  return (
    <div className='flex items-center justify-between py-3 last:border-b-0 border-b-[1px] border-dashed border-grey-200 border-x-0 border-t-0'>
      <div className='flex items-center'>
        <div className='relative rounded-full mr-2 '>
          <Avatar
            size={sizeConstants.avatar.large.width}
            username={member.fullname}
          />
          <img src={`images/bookmark-${memberIndex}.png`} className='absolute bottom-[-5px] right-0' />
          <div  className='absolute text-[9px] text-white font-semibold right-[4px] bottom-[-1px]'>{memberIndex}</div>
        </div>
        <div>
          <div className='text-fs-14 font-medium text-grey-800 mb-[2px] '>{member.fullname}</div>
          <div className='text-fs-12 text-grey-500'>Tham gia 2023</div>
        </div>
      </div>
      <div className='text-grey-700 text-fs-12'>{member.coundFeed} bài viết</div>
    </div>
  )
}

const BlockActiveMember = () => {
  return (
    <div className='bg-white shadow-[0px_0px_3px_rgba(0,0,0,0.1)] rounded-[8px] p-4'>
      <div className='flex items-center border-b-[1px] border-solid border-grey-50 border-x-0 border-t-0 pb-2'>
        <i className='ms ms-star_2 text-yellow-300 text-fs-20 mr-2' />
        <div className='text-fs-18 font-semibold text-grey-800'>Thành viên tích cực</div>
      </div>

      <div>
        {listActiveMember.map((member, index) => (
          <ActiveMemberItem key={index} member={member} memberIndex={index + 1} />
        ))}
      </div>
    </div>
  )
}

export default BlockActiveMember
