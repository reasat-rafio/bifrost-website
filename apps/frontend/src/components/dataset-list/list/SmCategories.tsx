import { Listbox } from '@headlessui/react'
import clsx from 'clsx'
import { useCtx } from 'src/context/global'
import { ICategory, IDatasetCard } from 'src/lib/@types/datasetTypes'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface SmCategoriesProps {
  className?: string
  categories: ICategory[]
  datasets: IDatasetCard[]
  setDatasets: Dispatch<SetStateAction<IDatasetCard[]>>
}

export const SmCategories: React.FC<SmCategoriesProps> = ({
  className,
  categories,
  setDatasets,
}) => {
  const [selectDatasets, setSelectDatasets] = useState<string>('All')

  const {
    action: { setTempDatasets },
    state: { allDatasets },
  } = useCtx()

  useEffect(() => {
    if (selectDatasets === 'All') {
      setDatasets(allDatasets)
      setTempDatasets(allDatasets)
    } else {
      const filteredDataset = allDatasets.filter(({ categories }) =>
        categories?.find(
          (ctgories) => ctgories.name.toLowerCase() === selectDatasets.toLowerCase(),
        ),
      )
      setDatasets(filteredDataset)
      setTempDatasets(filteredDataset)
    }
  }, [selectDatasets])

  return (
    <div className={clsx(className, 'mb-8 z-40 relative')}>
      <Listbox value={selectDatasets} onChange={setSelectDatasets}>
        <div className="relative">
          <Listbox.Label className="text-[14px] leading-7 font-light text-white opacity-70 mb-1 inline-block">
            Categories
          </Listbox.Label>
          <div>
            <Listbox.Button className="datasetInputs mr-auto flex">
              {selectDatasets ?? 'Select a Categories'}
            </Listbox.Button>

            <Listbox.Options className="absolute w-full mt-2 overflow-auto max-h-80 border rounded-[6px] border-[#C9FF71]/20 __transparent__background  scrollbar-thumb-honeySuckle scrollbar-thin scrollbar-track-gray-100 py-2 z-30">
              {[{ name: 'All' }, ...categories].map(({ name, _id }) => (
                <Listbox.Option
                  className="hover:bg-gradient-to-l from-[#f8e9ff] via-[#e4acff] to-[#7187ff] hover:text-transparent duration-300 hover:bg-clip-text opacity-70 text-white text-[18px] font-light cursor-pointer capitalize transition-none px-4 py-1"
                  key={_id ?? name}
                  value={name}
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