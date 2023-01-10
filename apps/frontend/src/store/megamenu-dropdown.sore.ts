import { DropdownListProps } from 'lib/@types/global-types'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

type IModalState = 'hidden' | 'visible'
type IPosition = { x: number; y: number }

interface IMengaMenuStore {
  modalState: IModalState
  position: IPosition
  data: DropdownListProps[] | null
  setModalState: (modalState: IModalState) => void
  setPosition: (position: IPosition) => void
  setData: (data: DropdownListProps[]) => void
}

const useMegamenuDropownStore = create(
  devtools<IMengaMenuStore>((set) => ({
    modalState: 'hidden',
    data: null,
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
  })),
)

export default useMegamenuDropownStore
