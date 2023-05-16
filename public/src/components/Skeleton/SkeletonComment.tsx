const SkeletonComment = () => {
  return (
    <div className='mb-4'>
      <div className='flex justify-between items-center mb-2'>
        <div className='flex items-center w-full'>
          <div className='bg-dark-gray rounded-full object-cover w-6 h-6'></div>
          <div className='bg-dark-gray w-[40%] h-6 ml-2'></div>
        </div>
      </div>
      <div className='bg-dark-gray w-full h-16 mb-2'></div>
      <div className='bg-dark-gray w-[20%] h-5'></div>
    </div>
  )
}

const SkeletonCommentWrapper = ({ col }: any) => {
  const column: any = []
  column.length = col
  column.fill(1)

  return column.map((_, index: number) => {
    return <SkeletonComment key={index} />
  })
}

export default SkeletonCommentWrapper
