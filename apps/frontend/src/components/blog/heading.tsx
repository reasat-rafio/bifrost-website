import { formatDate } from 'src/lib/helpers'
import React from 'react'

interface HeadingProps {
  heading: string
  datetime: string
}

export const Heading: React.FC<HeadingProps> = ({ heading, datetime }) => {
  return (
    <div className="grid grid-cols-12 lg:gap-10">
      <div className="lg:col-span-3" />
      <header className="lg:col-span-9 col-span-12 2xl:max-w-5xl max-w-4xl">
        <h1 className="text-[#000610] xl:text-[52px] lg:text-4xl text-3xl font-primary mb-3 !leading-none">
          {heading}
        </h1>
        <span className="text-base text-[#5D6588]">{formatDate(datetime?.split('T')[0])}</span>
      </header>
    </div>
  )
}
