import Link from 'next/link'

const HomePage = () => {
  return (
    <div className='flex h-screen  items-center justify-center space-x-8'>
      <Link href='/course' className='underline text-fs-20 text-primary-700'>
        Khóa 24 ngày cơ bản
      </Link>
      <Link href='/course/advance' className='underline text-fs-20  text-primary-700'>
        Khóa nâng cao
      </Link>
    </div>
  )
}

export default HomePage
