import clsx from 'clsx'
import React from 'react'

interface GradientBorderProps {
  className?: string
  borderSize?: string
  borderRadious?: string
  gradient?: string
  innerClass?: string
  background?: string
  children?: any
}

export const GradientBorder: React.FC<GradientBorderProps> = ({
  children,
  className,
  borderSize = '1px',
  borderRadious = '15px',
  gradient = 'gradient__white__to__green',
  innerClass = '',
  background = 'background__dark',
}) => {
  return (
    <div
      className={clsx(className, gradient, 'relative')}
      style={{ padding: borderSize, borderRadius: borderRadious }}
    >
      <div
        className={clsx(innerClass, background, 'flex flex-col justify-between')}
        style={{ borderRadius: borderRadious }}
      >
        {children}
      </div>
    </div>
  )
}
