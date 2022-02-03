import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

interface ContextProps {
  isWhite: boolean
  setIsWhite: Dispatch<SetStateAction<boolean>>
}

const Store = createContext<ContextProps>({} as ContextProps)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isWhite, setIsWhite] = useState(false)

  const value = {
    isWhite,
    setIsWhite,
  }

  return <Store.Provider value={value}>{children}</Store.Provider>
}

export const useCtx = (): ContextProps => useContext(Store)
