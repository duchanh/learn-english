import { create } from 'zustand'
import produce from 'immer'

type CommonState = {
  currentLocation: string
  setCurrentLocation: (location: string) => void
}

const initState = {
  currentLocation: ''
}

const useCommonStore = create<CommonState>((set, get) => ({
  ...initState,
  setCurrentLocation: (location: string) => {
    return set(
      produce((state) => {
        state.currentLocation = location
      })
    )
  }
}))

export default useCommonStore
