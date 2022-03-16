import clsx from 'clsx'
import React from 'react'

interface HeaderProps {
  className?: string
}

export const Header: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <h4
      className={clsx(
        className,
        'md:text-head-4 md:tracking-[0.02em] tracking-[0.01em] text-head-4-res font-[275] leading-none',
      )}
    >
      {children}
    </h4>
  )
}
