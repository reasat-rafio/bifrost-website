import React from 'react'
import clsx from 'clsx'

interface GradientTitleProps {
  gradient?: string
  className?: string
  children: any
}

export const GradientTitle: React.FC<GradientTitleProps> = ({
  gradient = 'primary__gradient',
  className,
  children,
}) => {
  return (
    <span className="flex">
      <h3
        className={clsx('text-head-6 bg-clip-text uppercase text-transparent', className, gradient)}
      >
        {children}
      </h3>
    </span>
  )
}
