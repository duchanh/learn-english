import { GetServerSidePropsContext } from 'next'
import fetchCourse from '@/api/endpoint/course/fetch-course'

export async function getCourseProps(context: GetServerSidePropsContext) {
  try {
    const course = await fetchCourse()
    console.log('response', course)
    return {
      props: {
        course
      }
    }
  } catch {
    return {
      props: {}
    }
  }
}
