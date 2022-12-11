import clsx from 'clsx'
import React from 'react'

interface DescriptionProps {
  className?: string
  children: any
}

export const Description: React.FC<DescriptionProps> = ({ children, className }) => {
  return (
    <p className={clsx(className, 'font-light opacity-70 md:text-body-1 text-body-1-mobile')}>
      {children}
    </p>
  )
}
