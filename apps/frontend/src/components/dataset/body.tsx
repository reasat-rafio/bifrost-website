import { Idataset } from 'lib/@types/dataset-types'
import React from 'react'
import { PortableText } from 'utils/sanity'
import Serializers from './serializers'

interface BodyProps {
  body: Idataset['body']
  heading: Idataset['heading']
  subHeading: Idataset['subHeading']
  license: Idataset['license']
}

export const Body: React.FC<BodyProps> = ({ body, heading, license, subHeading }) => {
  return (
    <section className="mt-10">
      <header className="">
        <h1 className="font-primary md:text-head-4 text-head-md tracking-[0.02em]">{heading}</h1>
        <h4 className="uppercase text-[16px] mb-4 tracking-[0.02em]">{subHeading}</h4>
        <span className="p-1 border border-[#77798A]/50 rounded-[4px] text-[13px] tracking-wide">
          License: {license}
        </span>
      </header>

      <div className="prose prose-lg  max-w-none prose-a:text-[#C9FF71] prose-headings:text-white prose-headings:font-light prose-a:cursor-pointer">
        <PortableText blocks={body} serializers={Serializers} />
      </div>
    </section>
  )
}
