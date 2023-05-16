import { MEEEYID_SDK_URL, STATIC_DOMAIN } from '@/constants/environment'
import { AuthContextProvider } from '@/context/auth.context'
import '@/styles/globals.scss'
import Script from 'next/script'
import { useAmp } from 'next/amp'
import dynamic from 'next/dynamic'
import App, { AppProps, AppContext } from 'next/app'
import { DeviceContextProvider } from '@/context/device.context'
import getAllCategory from '@/api/endpoint/category/get-all-category'
import { CategoryContextProvider } from '@/context/categories.context'
import { SmartBannerContextProvider } from '@/context/smart-banner.context'
import { OneSignalContextProvider } from '@/context/oneSignal.context'


type TProps = AppProps & {
  isMobile: boolean
  categories: any
}
const CustomApp = ({ Component, pageProps, isMobile, categories }: TProps) => {
  const isAmp = useAmp()
  // @ts-ignore
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
CustomApp.getInitialProps = async (context: AppContext) => {
  const ctx = await App.getInitialProps(context)
  const categories = await getAllCategory()
  let userAgent: any
  if (context.ctx.req) {
    // if you are on the server and you get a 'req' property from your context
    userAgent = context.ctx.req.headers['user-agent'] // get the user-agent from the headers
  } else {
    userAgent = navigator.userAgent // if you are on the client you can access the navigator from the window object
  }

  const isMobile = Boolean(
    userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
  )
  return { ...ctx, isMobile, categories }
}

export default CustomApp
