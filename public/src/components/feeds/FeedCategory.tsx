import CategoryBox from '@/components/common/CategoryBox'
import { generateCategoryUrl } from '@/extensions/route'
import Link from 'next/link'

const FeedCategory = ({ feedCategory: category }: any) => {
  return category ? (
    <Link className='flex flex-col md:flex-row py-3 px-4' href={generateCategoryUrl(category)} title={category?.name}>
      <div className='flex items-center md:mr-2'>
        <CategoryBox categoryStyle={category?.css} />
        <div className='ml-[10px] text-fs-12 text-grey-700 font-medium uppercase'>
          {category?.name}
        </div>
      </div>
    </Link>
  ) : null
}

export default FeedCategory
