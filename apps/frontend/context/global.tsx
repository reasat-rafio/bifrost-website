import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import { SanityImage } from 'sanity-react-extra'

interface ContextState {
  lightboxImage: null | SanityImage
}

interface ContextAction {
  setLightboxImage: Dispatch<SetStateAction<null | SanityImage>>
}

interface ContextProps {
  state: ContextState
  action: ContextAction
}

const Store = createContext<ContextProps>({} as ContextProps)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lightboxImage, setLightboxImage] = useState<null | SanityImage>(null)

  const value = {
    state: { lightboxImage },
    action: { setLightboxImage },
  }

  return <Store.Provider value={value}>{children}</Store.Provider>
}

export const useCtx = (): ContextProps => useContext(Store)
