import { Meta } from '@/components/layouts/Meta';

interface IHomeSeoProps {
  title: string
  description?: string
  additionalMetaTags?: { name: string; content: string }[]
}

const HomeSeo = ({ title, description, additionalMetaTags }: IHomeSeoProps) => {
  return <Meta title={title} description={description} additionalMetaTags={additionalMetaTags} />
}

export default HomeSeo
