import React from 'react'

interface GradientBorderProps {
  className?: string
  borderSize?: string
  borderRadious?: string
}

export const GradientBorder: React.FC<GradientBorderProps> = ({
  children,
  borderSize = '5px',
  borderRadious = '15px',
}) => {
  return (
    <div className="relative">
      <div
        className="bifrost__gradient_green"
        style={{ padding: borderSize, borderRadius: borderRadious }}
      >
        <div className="flex flex-col justify-between  bg-white text-white rounded-lg p-1">
          {children}
        </div>
      </div>
    </div>
  )
}
