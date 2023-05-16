import { generateCategoryUrl } from '@/extensions/route'
import clsx from 'clsx'
import { Category } from 'Models'
import { useRouter } from 'next/router'
import CategoryBox from '../common/CategoryBox'
import FeedGroupItem from './FeedGroupItem'

interface IFeedGroup<> {
  title: React.ReactNode
  category?: Category
  data: any[]
  className?: string
}

const FeedGroup = ({ title, data = [], className, category }: IFeedGroup) => {
  const router = useRouter()

  return data && data.length > 0 ? (
    <div className={clsx(className)}>
      <div className='pt-4 mb-2 text-fs-18 font-semibold text-grey-800'>{title}</div>
      {category ? (
        <div
          className='py-2 mb-4 flex items-center shadow-[inset_0px_-1px_0px_#ECECEC;]'
          onClick={() => {
            router.push(generateCategoryUrl(category))
          }}
        >
          <CategoryBox categoryStyle={category.css} />
          <span className='text-fs-12 font-medium text-grey-700 uppercase ml-[6px] border border-b-'>
            {category.name}
          </span>
        </div>
      ) : null}
      <div className='flex flex-col'>
        {data?.map((item: any, index) => (
          <FeedGroupItem key={index} feed={item} />
        ))}
      </div>
    </div>
  ) : null
}

export default FeedGroup
