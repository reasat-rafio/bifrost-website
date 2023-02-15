import { DropdownListProps } from 'lib/@types/global-types'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

type IModalState = 'hidden' | 'visible'
type IPosition = { x: number; y: number }

interface IMengaMenuStore {
  modalState: IModalState
  position: IPosition
  data: DropdownListProps[] | null
  interseting: boolean
  setModalState: (modalState: IModalState) => void
  setPosition: (position: IPosition) => void
  setData: (data: DropdownListProps[]) => void
  setInterseting: (data: boolean) => void
}

const useMegamenuDropownStore = create(
  devtools<IMengaMenuStore>((set) => ({
    modalState: 'hidden',
    data: null,
    interseting: false,
    position: {
      x: 0,
      y: 0,
    },
    setModalState: (modalState) =>
      set((state) => ({
        ...state,
        modalState,
      })),
    setPosition: (position) =>
      set((state) => ({
        ...state,
        position,
      })),
    setData: (data) =>
      set((state) => ({
        ...state,
        data,
      })),
    setInterseting: (interseting) =>
      set((state) => ({
        ...state,
        interseting,
      })),
  })),
)

export default useMegamenuDropownStore
