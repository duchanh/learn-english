import { createFetcher } from '@/api/utils/fetch-api'
import REQUEST_METHOD from '@/constants/request-method'

const fetchCourse = async () => {
  const response = await createFetcher(() => ({
    apiUrl: 'https://course3.alexdsing.com/'
  }))(REQUEST_METHOD.GET, `24day.json?v=9`, null, {})
  return response || null
}

export default fetchCourse

