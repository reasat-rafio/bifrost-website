import { IToast } from 'lib/@types/types'
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import { SanityImage } from 'sanity-react-extra'

interface ContextState {
  lightboxImage: null | SanityImage
  toasts: IToast[]
}

interface ContextAction {
  setLightboxImage: Dispatch<SetStateAction<null | SanityImage>>
  setToasts: Dispatch<SetStateAction<IToast[]>>
  addToast: (content: IToast) => void
  removeToast: (id: string) => void
  onDismiss: (id: string) => void
}

interface ContextProps {
  state: ContextState
  action: ContextAction
}

const Store = createContext<ContextProps>({} as ContextProps)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lightboxImage, setLightboxImage] = useState<null | SanityImage>(null)
  const [toasts, setToasts] = useState<IToast[]>([])

  const addToast = (content: IToast) => {
    const newToasts = [...toasts, content]
    setToasts(newToasts)
  }

  const removeToast = (id: string) => {
    const newToasts = toasts.filter((t) => t.id !== id)
    setToasts(newToasts)
  }

  const onDismiss = (id: string) => () => {
    removeToast(id)
  }

  const value = {
    state: { lightboxImage, toasts },
    action: { setLightboxImage, setToasts, addToast, removeToast, onDismiss },
  }

  return <Store.Provider value={value}>{children}</Store.Provider>
}

export const useCtx = (): ContextProps => useContext(Store)
