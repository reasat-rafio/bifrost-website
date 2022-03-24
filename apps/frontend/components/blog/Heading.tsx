import { formatDate } from 'lib/helpers'
import React from 'react'

interface HeadingProps {
  heading: string
  datetime: string
}

export const Heading: React.FC<HeadingProps> = ({ heading, datetime }) => {
  return (
    <div className="grid grid-cols-12 lg:gap-10">
      <div className="lg:col-span-3" />
      <div className="lg:col-span-9 col-span-12 max-w-6xl">
        <h1 className="text-[#000610] text-[52px] font-[275] tracking-[0.02em] leading-[110%] mb-3">
          {heading}
        </h1>
        <span className="text-[14px]">{formatDate(datetime?.split('T')[0])}</span>
      </div>
    </div>
  )
}
