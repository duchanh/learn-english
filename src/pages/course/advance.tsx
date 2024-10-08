import Course from '@/modules/Course'
import { GetServerSidePropsContext } from 'next'
import { getCourseProps } from '@/fetch-data/course-advance-props'
import { NextSeo } from 'next-seo'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await getCourseProps(context)
}
const Page = (props: any) => {
  return (
    <>
      <NextSeo title='Advance' />
      <Course {...props} />
    </>
  )
}
export default Page
