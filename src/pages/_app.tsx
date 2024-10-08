import '@/styles/globals.scss'
import App, { AppProps, AppContext } from 'next/app'


type TProps = AppProps & {
  isMobile: boolean
  categories: any
}
const CustomApp = ({ Component, pageProps, isMobile, categories }: TProps) => {
  // @ts-ignore
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
CustomApp.getInitialProps = async (context: AppContext) => {
  const ctx = await App.getInitialProps(context)
  return { ...ctx }
}

export default CustomApp
