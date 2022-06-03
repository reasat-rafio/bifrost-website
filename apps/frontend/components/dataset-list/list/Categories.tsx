import clsx from 'clsx'
import { useCtx } from 'contexts/global'
import { ICategory, IDatasetCard } from 'lib/@types/datasetTypes'
import React, { Dispatch, SetStateAction, useState } from 'react'

interface CategoriesProps {
  categories: ICategory[]
  className?: string
  setDatasets: Dispatch<SetStateAction<IDatasetCard[]>>
}

export const Categories: React.FC<CategoriesProps> = ({ categories, className, setDatasets }) => {
  const {
    state: { allDatasets },
  } = useCtx()

  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('All')

  const onClickAction = (name: string) => {
    setSelectedCategoryName(name)

    if (name === 'All') setDatasets(allDatasets)
    else {
      const filteredDataset = allDatasets.filter(({ categories }) =>
        categories?.find((ctgories) => ctgories.name.toLowerCase() === name.toLowerCase()),
      )
      setDatasets(filteredDataset)
    }
  }

  return (
    <div className={className}>
      <div className="border border-[#C9FF71]/30 __transparent__background rounded-[6px]">
        <h4 className="text-4xl font-[375] p-4 border-b border-[#1E2531]">Categories</h4>
        <ul className="p-4 flex flex-col space-y-3">
          {[{ name: 'All' }, ...categories].map(({ name, _id }) => (
            <li className="flex" key={_id ?? name} onClick={() => onClickAction(name)}>
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
