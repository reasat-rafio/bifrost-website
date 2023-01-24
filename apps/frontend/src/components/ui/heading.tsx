import clsx from 'clsx'
import React, { ReactNode } from 'react'

interface HeadingProps {
  className?: string
  children: ReactNode
}

export const Heading: React.FC<HeadingProps> = ({ children, className }) => {
  return <h4 className={clsx(className, 'text-[48px]')}>{children}</h4>
}
