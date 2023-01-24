import clsx from 'clsx'
import React, { ReactNode } from 'react'

interface DescriptionProps {
  className?: string
  children: ReactNode
}

export const Description: React.FC<DescriptionProps> = ({ children, className }) => {
  return <p className={clsx(className, 'lg:text-[24px] sm:text-xl text-lg')}>{children}</p>
}
