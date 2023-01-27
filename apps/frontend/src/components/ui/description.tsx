import clsx from 'clsx'
import React, { ReactNode } from 'react'

interface DescriptionProps {
  className?: string
  children: ReactNode
  textBig?: boolean
}

export const Description: React.FC<DescriptionProps> = ({
  children,
  className,
  textBig = false,
}) => {
  return (
    <p
      className={clsx(
        className,
        textBig ? 'lg:text-[36px] sm:text-3xl text-2xl' : 'lg:text-[24px] sm:text-xl text-lg',
      )}
    >
      {children}
    </p>
  )
}
