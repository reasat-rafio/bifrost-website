import create from 'zustand'
import { devtools } from 'zustand/middleware'

type IModalState = 'hidden' | 'visible'
type IPosition = { x: number; y: number }

interface IMengaMenuStore {
  modalState: IModalState
  position: IPosition
  setModalState: (modalState: IModalState) => void
  setPosition: (position: IPosition) => void
}

const useMegamenuDropownStore = create(
  devtools<IMengaMenuStore>((set) => ({
    modalState: 'hidden',
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
  })),
)

export default useMegamenuDropownStore
