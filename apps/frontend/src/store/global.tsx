import { IDatasetListPreview } from 'lib/@types/dataset-types'
import { IToast } from 'lib/@types/global-types'
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import { SanityImage } from 'sanity-react-extra'

interface ContextState {
  allDatasets: IDatasetListPreview[]
  tempDatasets: IDatasetListPreview[]
  lightboxImage: null | SanityImage
  toasts: IToast[]
  navbarHeight: number
}

interface ContextAction {
  setLightboxImage: Dispatch<SetStateAction<null | SanityImage>>
  setToasts: Dispatch<SetStateAction<IToast[]>>
  setAllDataSets: Dispatch<SetStateAction<IDatasetListPreview[]>>
  setTempDatasets: Dispatch<SetStateAction<IDatasetListPreview[]>>
  setNavabrHeight: Dispatch<SetStateAction<number>>
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
  const [navbarHeight, setNavabrHeight] = useState(0)
  const [allDatasets, setAllDataSets] = useState<IDatasetListPreview[]>([])
  const [tempDatasets, setTempDatasets] = useState<IDatasetListPreview[]>([])

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
    state: { lightboxImage, toasts, allDatasets, tempDatasets, navbarHeight },
    action: {
      setLightboxImage,
      setToasts,
      addToast,
      removeToast,
      onDismiss,
      setAllDataSets,
      setTempDatasets,
      setNavabrHeight,
    },
  }

  return <Store.Provider value={value}>{children}</Store.Provider>
}

export const useCtx = (): ContextProps => useContext(Store)
