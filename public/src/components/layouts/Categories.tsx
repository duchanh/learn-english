import { PAGE_ROUTE } from '@/constants/route'
import { generateCategoryUrl } from '@/extensions/route'
import className from 'clsx'
import { Category } from 'Models'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CategoryBox from '../common/CategoryBox'

export interface IFeedMenus {
  classNames?: String
  categories: Category[]
  currentCate?: Category
}

const Categories = ({ classNames, categories, currentCate }: IFeedMenus) => {
  const { query, asPath } = useRouter()

  const isHomePage = !!(asPath === PAGE_ROUTE.HOME)
  return (
    <div className={className(classNames)}>
      <Link
        href={PAGE_ROUTE.HOME}
        className={className(
          'flex items-center rounded-lg px-3 h-10 w-[200px] hover:bg-grey-50 cursor-pointer transition-all duration-300 text-grey-800 mb-2',
          { 'font-semibold bg-white hover:bg-white': isHomePage }
        )}
        title="Trang chủ"
      >
        <i className={className('ms ms-home text-xl text-[#766DE5]', {})}></i>
        <span className='ml-[0.625rem] mr-2'>Trang chủ</span>
      </Link>

      {categories?.map((cate: Category, index: number) => {
        return (
          <Link
            href={generateCategoryUrl(cate)}
            key={index}
            className={className(
              'flex items-center rounded-lg px-3 h-10 w-[200px] text-base cursor-pointer transition-all duration-300 mb-2 hover:bg-[#E4E7EE]',
              {
                'font-semibold bg-white hover:bg-white': query.category === cate.slug
              }
            )}
            title={cate.name}
          >
            <CategoryBox categoryStyle={cate.css} />
            <span
              className={className(
                'ml-[0.625rem] text-grey-800 leading-4',
              )}
            >
              {cate.name}
            </span>
          </Link>
        )
      })}
    </div>
  )
}

export default Categories
