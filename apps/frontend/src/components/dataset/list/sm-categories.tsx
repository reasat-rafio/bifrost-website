import { Listbox } from '@headlessui/react'
import clsx from 'clsx'
import { CategoriesProps } from 'lib/@types/dataset-types'
import React from 'react'
import useDatasetStore from 'store/dataset.store'

interface SmCategoriesProps {
  className?: string
}

export const SmCategories: React.FC<SmCategoriesProps> = ({ className }) => {
  const { allCategories, setSelectedCatagory, selectedCategory } = useDatasetStore()

  const onChangeAction = ({ _id, name }: CategoriesProps) => {
    setSelectedCatagory({ name, _id })
  }

  return (
    <div className={clsx(className, 'mb-8 z-40 relative')}>
      <Listbox value={selectedCategory} onChange={onChangeAction}>
        <div className="relative">
          <Listbox.Label className="text-[14px] leading-7 font-light text-white opacity-70 mb-1 inline-block">
            Categories
          </Listbox.Label>
          <div>
            <Listbox.Button className="datasetInputs mr-auto flex">
              {selectedCategory?.name ?? 'Select a Categories'}
            </Listbox.Button>

            <Listbox.Options className="absolute w-full mt-2 overflow-auto max-h-80 border rounded-[6px] border-[#C9FF71]/20 __transparent__background  scrollbar-thumb-honeySuckle scrollbar-thin scrollbar-track-gray-100 py-2 z-30">
              {[{ name: 'All', _id: null }, ...allCategories].map(({ name, _id }) => (
                <Listbox.Option
                  className="hover:bg-gradient-to-l from-[#f8e9ff] via-[#e4acff] to-[#7187ff] hover:text-transparent duration-300 hover:bg-clip-text opacity-70 text-white text-[18px] font-light cursor-pointer capitalize transition-none px-4 py-1"
                  key={_id ?? name}
                  value={{ name, _id }}
                >
                  {name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </div>
      </Listbox>
    </div>
  )
}
