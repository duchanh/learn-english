import CategoryBox from "@/components/common/CategoryBox"
import { useCategoryBySlug } from '@/hooks/category/useCategory'
import { useRouter } from 'next/router'

const CategoryPageTitle = () => {
  const { query } = useRouter()
  const categorySlug = query.category
  const category = useCategoryBySlug(categorySlug)
  return (
    <>
      {category ? (
        <>
          <div className='md:mb-6 bg-white p-4 md:p-0 md:bg-transparent'>
            <div className='flex items-center'>
              <CategoryBox categoryStyle={category.css} width={15} height={15} />
              <div className='ml-1.5 md:text-fs-24 text-fs-20 text-grey-800 font-semibold'>
                {category.name}
              </div>
            </div>
          </div>
          <div className='px-4'>
            <div className='border-b-[1px] border-grey-100 border-solid border-x-0 border-t-0 md:border-0'></div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default CategoryPageTitle