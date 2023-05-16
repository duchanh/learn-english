import Link from "next/link"
import { PAGE_ROUTE } from '@/constants/route'

const mockListFooter = [
  {
    name: 'Về Meey Share',
    url: PAGE_ROUTE.ABOUT_US
  },
  {
    name: 'Trợ giúp',
    url: PAGE_ROUTE.HELP
  },
  {
    name: 'Điều khoản sử dụng',
    url: PAGE_ROUTE.TERM_OF_USE
  },
  {
    name: 'Chính sách bảo mật',
    url: PAGE_ROUTE.PRIVATE_POLICY
  },
  {
    name: '© Một sản phẩm của Meey Group',
    url: '/'
  }
]

const ContentFooter = () => {
  return (
    <div className='hidden lg:flex flex-col'>
      {mockListFooter.map((item) => (
        <Link title={item.name} key={item.name} className='font-normal text-xs leading-6 text-grey-900 cursor-pointer' href={item.url}>
          {item.name}
        </Link>
      ))}
    </div>
  )
}

export default ContentFooter
