import Course from '@/modules/Course'
import { GetServerSidePropsContext } from 'next'
import { getCourseProps } from '@/fetch-data/course-props'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await getCourseProps(context)
}

export default Course
