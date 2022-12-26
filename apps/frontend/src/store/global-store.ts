import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface IGlobalStore {
  showNavDropDown: boolean
  setShowNavDropDown: (data: boolean) => void
}

const useGlobalStore = create(
  devtools<IGlobalStore>((set) => ({
    showNavDropDown: false,
    setShowNavDropDown: (showNavDropDown) =>
      set((state) => ({
        ...state,
        showNavDropDown,
      })),
  })),
)

export default useGlobalStore
