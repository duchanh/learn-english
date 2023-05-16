import Home from '@/modules/Home'
import { GetServerSidePropsContext } from 'next'
import { getHomeSSRProps } from '@/fetch-data/home-props'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await getHomeSSRProps(context)
}

export default Home
