import clsx from 'clsx'
import React, { forwardRef } from 'react'

interface GradientBorderProps {
  className?: string
  borderSize?: string
  borderRadious?: string
  gradient?: string
  innerClass?: string
  background?: string
  children?: any
  ref?: React.ForwardedRef<HTMLElement>
}

export const GradientBorder: React.FC<GradientBorderProps> = forwardRef(
  (
    {
      children,
      className,
      borderSize = '1px',
      borderRadious = '15px',
      gradient = 'primary__gradient',
      innerClass = '',
    },
    ref,
  ) => {
    return (
      <div
        ref={ref as React.LegacyRef<HTMLDivElement>}
        className={clsx(className, gradient, 'relative max-w-screen-2xl mx-auto')}
        style={{ padding: borderSize, borderRadius: borderRadious }}
      >
        <div
          className={clsx(innerClass, 'bg-black flex flex-col justify-between')}
          style={{ borderRadius: borderRadious }}
        >
          {children}
        </div>
      </div>
    )
  },
)