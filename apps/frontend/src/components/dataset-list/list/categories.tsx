import clsx from 'clsx'
import { CategoriesProps } from 'lib/@types/dataset-types'
import React, { useState } from 'react'
import useDatasetStore from 'store/dataset.store'

interface ICategoriesProps {
  className?: string
}

export const Categories: React.FC<ICategoriesProps> = ({ className }) => {
  const { allCategories, setSelectedCatagory } = useDatasetStore()
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('All')

  const onClickAction = ({ _id, name }: CategoriesProps) => {
    setSelectedCategoryName(name)
    if (name === 'All') setSelectedCatagory(null)
    else setSelectedCatagory({ name, _id })
  }

  return (
    <div className={className}>
      <div className="border border-[#C9FF71]/30 __transparent__background rounded-[6px]">
        <h4 className="text-4xl font-[375] p-4 border-b border-[#1E2531]">Categories</h4>
        <ul className="p-4 flex flex-col space-y-3">
          {[{ name: 'All', _id: null }, ...allCategories].map(({ name, _id }) => (
            <li className="flex" key={_id ?? name} onClick={() => onClickAction({ name, _id })}>
              <span
                className={clsx(
                  'hover:bg-gradient-to-l from-[#f8e9ff] via-[#e4acff] to-[#7187ff] hover:text-transparent duration-300 hover:bg-clip-text opacity-70 text-white text-[18px] font-light cursor-pointer capitalize transition-none',
                  selectedCategoryName === name && 'bg-gradient-to-l bg-clip-text text-transparent',
                )}
              >
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
