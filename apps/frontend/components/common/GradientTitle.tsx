import React from 'react'
import clsx from 'clsx'

interface GradientTitleProps {
  gradient?: string
  className?: string
}

export const GradientTitle: React.FC<GradientTitleProps> = ({
  gradient = 'bifrost__gradient__green',
  className,
  children,
}) => {
  return (
    <span className="flex">
      <h4
        className={clsx('text-head-6 bg-clip-text uppercase text-transparent', className, gradient)}
      >
        {children}
      </h4>
    </span>
  )
}
