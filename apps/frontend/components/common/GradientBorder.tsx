import clsx from 'clsx'
import React from 'react'

interface GradientBorderProps {
  className?: string
  borderSize?: string
  borderRadious?: string
}

export const GradientBorder: React.FC<GradientBorderProps> = ({
  children,
  borderSize = '1px',
  borderRadious = '15px',
  className,
}) => {
  return (
    <div
      className={clsx(className, 'bifrost__gradient_green relative')}
      style={{ padding: borderSize, borderRadius: borderRadious }}
    >
      <div
        className="flex flex-col justify-between background__dark "
        style={{ borderRadius: borderRadious }}
      >
        {children}
      </div>
    </div>
  )
}
