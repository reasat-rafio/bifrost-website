import clsx from 'clsx'
import React, { ReactNode } from 'react'

interface HeadingProps {
  className?: string
  children: ReactNode
}

export const Heading: React.FC<HeadingProps> = ({ children, className }) => {
  return (
    <h4 className={clsx(className, 'xl:text-[48px] lg:text-5xl md:text-5xl text-4xl')}>
      {children}
    </h4>
  )
}
