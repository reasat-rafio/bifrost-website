import clsx from 'clsx'
import { GradientBorder } from 'components/common/GradientBorder'
import { ICategory } from 'lib/@types/datasetTypes'
import React from 'react'

interface CategoriesProps {
  categories: ICategory[]
  className?: string
}

export const Categories: React.FC<CategoriesProps> = ({ categories, className }) => {
  return (
    <div className={className}>
      <GradientBorder
        gradient="bg-gradient-to-r from-[#eeffe9]/30 via-[#acffeb]/30 to-[#c9ff71]/30"
        borderRadious="6px"
      >
        <h4 className="text-4xl font-[375] p-4 border-b border-[#1E2531]">Categories</h4>
        <ul className="p-4 flex flex-col space-y-3">
          {[{ name: 'All' }, ...categories].map(({ name, _id }) => (
            <li className="flex" key={_id ?? name}>
              <span className="hover:bg-gradient-to-l from-[#f8e9ff] via-[#e4acff] to-[#7187ff] hover:text-transparent duration-300 hover:bg-clip-text opacity-70 text-white text-[18px] font-light cursor-pointer capitalize transition-none">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </GradientBorder>
    </div>
  )
}
