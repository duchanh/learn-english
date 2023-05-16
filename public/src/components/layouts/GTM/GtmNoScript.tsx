import { GTM_CODE } from "@/constants/environment"
const GtmNoScript = () => {
  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_CODE}`}
          height='0'
          width='0'
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>
    </>
  )
}
export default GtmNoScript
