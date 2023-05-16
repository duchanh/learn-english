
const SkeletonListArticleMobile = () => {
  return (
    <>
      <div className='skeleton-container skeleton mb-2 md:mb-5 shadow-[0px_0px_3px_rgba(0,0,0,0.1)]'>
        <div className='p-4 w-full mb-[18px]'>
          <div className='flex items-center w-full mb-[18px]'>
            <div className='rounded-full w-6 h-6 bg-dark-gray mr-1'></div>
            <div className='h-3 w-1/3 bg-dark-gray'></div>
          </div>
          <div className='bg-dark-gray h-[10px] mb-2'></div>
          <div className='bg-dark-gray h-[10px]'></div>
        </div>
        <div className='w-full h-[11.6875rem] md:h-[18.3125rem] bg-dark-gray'></div>
        <div className='h-10 px-4 flex items-center'>
          <div className='h-3 w-[7rem] bg-dark-gray'></div>
        </div>
      </div>
      <div className='skeleton-container skeleton shadow-[0px_0px_3px_rgba(0,0,0,0.1)]'>
        <div className='p-4 w-full mb-[18px]'>
          <div className='flex items-center w-full mb-[18px]'>
            <div className='rounded-full w-6 h-6 bg-dark-gray mr-1'></div>
            <div className='h-3 w-1/3 bg-dark-gray'></div>
          </div>
          <div className='bg-dark-gray h-[10px] mb-2'></div>
          <div className='bg-dark-gray h-[10px]'></div>
        </div>
        <div className='w-full h-[11.6875rem] md:h-[18.3125rem] bg-dark-gray'></div>
        <div className='h-10 px-4 flex items-center'>
          <div className='h-3 w-[7rem] bg-dark-gray'></div>
        </div>
      </div>
    </>
  )
}

export const SkeletonItem = () => {
  return <div className='skeleton-container skeleton shadow-[0px_0px_3px_rgba(0,0,0,0.1)]'>
    <div className='p-4 w-full mb-[18px]'>
      <div className='flex items-center w-full mb-[18px]'>
        <div className='rounded-full w-6 h-6 bg-dark-gray mr-1'></div>
        <div className='h-3 w-1/3 bg-dark-gray'></div>
      </div>
      <div className='bg-dark-gray h-[10px] mb-2'></div>
      <div className='bg-dark-gray h-[10px]'></div>
    </div>
    <div className='w-full h-[6rem] md:h-[8rem] bg-dark-gray'></div>
    <div className='h-10 px-4 flex items-center'>
      <div className='h-3 w-[7rem] bg-dark-gray'></div>
    </div>
  </div>
}

export default SkeletonListArticleMobile
