import getLocationNearby from '@/api/endpoint/common/get-location-nearby'
import { useRouter } from 'next/router'
import useCommonStore from '@/store/common-store'
import toast from 'react-hot-toast'

const useLocation = () => {
  const { push } = useRouter()
  const getPosition = (required?: boolean): Promise<any> => {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, (error) => {
        if (error) {
          toast.error(`Bạn đang không chia sẻ vị trí trên trình duyệt này!\n\n  Hãy vào cài đặt của trình duyệt để thiết lập chia sẻ vị trí!`)
        }
      })
    )
  }
 
  const getGeoLocation = async () => {
    if (navigator.geolocation) {
      const position = await getPosition(false)
      if (position?.coords) {
        const { coords } = position
        const payload = {
          location: {
            lat: coords?.latitude,
            lng: coords?.longitude
          }
        }
        const location: any = await getLocationNearby(payload)
        if (location) {
          push({
            query: {
              location: location._id
            }
          })
        }
      }
    }
  }

  const {currentLocation} = useCommonStore()
  return {
    getPosition,
    getGeoLocation,
    currentLocation
  }
}

export default useLocation
