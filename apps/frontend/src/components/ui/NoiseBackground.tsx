import React from 'react'

interface NoiseBackgroundProps {}

export const NoiseBackground: React.FC<NoiseBackgroundProps> = ({}) => {
  return (
    <div className="absolute top-0 left-0 w-[100vw] h-[100vh]">
      <div className="bifrost__background_noise" />
    </div>
  )
}
