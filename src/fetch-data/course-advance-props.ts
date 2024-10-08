import { GetServerSidePropsContext } from 'next'
import fetchCourseAdvance from '@/api/endpoint/course/fetch-course-advance'

export async function getCourseProps(context: GetServerSidePropsContext) {
  try {
    const course: any = await fetchCourseAdvance()
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
