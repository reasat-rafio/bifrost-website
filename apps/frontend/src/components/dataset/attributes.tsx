import { Idataset } from 'lib/@types/dataset-types'
import React from 'react'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'src/utils/sanity'

interface AttributesProps {
  attributes: Idataset['attributes']
}

export const Attributes: React.FC<AttributesProps> = ({ attributes }) => {
  return (
    <section className="my-8">
      <h4 className="mb-8 text-[26px] font-light">Dataset Attributes</h4>

      <ul className="flex flex-wrap max-w-2xl gap-4">
        {attributes.map(({ _key, icon, name, text }) => (
          <li
            key={_key}
            className="border border-[#0E1727] p-4 rounded-[4px] flex justify-center items-center space-x-3"
          >
            <div>
              <SanityImg image={icon} width={25} builder={imageUrlBuilder} alt={`${name} icon`} />
            </div>
            <div className="flex flex-col text-[16px]">
              <span className="opacity-70">{name}</span>
              <span>{text}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
