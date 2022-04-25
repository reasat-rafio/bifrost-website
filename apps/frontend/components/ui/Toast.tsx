import { useCtx } from 'contexts/global'
import React from 'react'

interface ToastProps {}

export const Toast: React.FC<ToastProps> = ({}) => {
  const {
    action: { onDismiss },
  } = useCtx()

  return <div className="m-5 p-5 cursor-pointer" onClick={onDismiss}></div>
}
