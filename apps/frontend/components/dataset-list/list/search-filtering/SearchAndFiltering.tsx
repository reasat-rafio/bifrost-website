import { ICategory } from 'lib/@types/datasetTypes'
import React, { useState } from 'react'
import { Combobox } from '@headlessui/react'
import { FilteringListBox } from './FilteringListBox'

interface SearchAndFilteringProps {
  taskTypes: ICategory[]
  labelFormat: ICategory[]
}

export const SearchAndFiltering: React.FC<SearchAndFilteringProps> = ({
  taskTypes,
  labelFormat,
}) => {
  const [selectedValue, setSelectedValue] = useState('')
  const [selectedTaskType, setSelectedTaskType] = useState(taskTypes[0].name)
  const [selectedLabelFormat, setSelectedLabelFormat] = useState(labelFormat[0].name)
  const [minImgValue, setMinImgValue] = useState<string | number>(0)

  return (
    <div className="w-full">
      <div className="rounded-[6px] border-[#C9FF71]/30 __transparent__background border">
        <div className="grid xl:grid-cols-13 grid-cols-12 p-4 xl:gap-4 gap-3">
          <div className="xl:col-span-4 col-span-6">
            <Combobox value={selectedValue} onChange={setSelectedValue}>
              <div className="relative">
                <Combobox.Label className="text-[14px] leading-7 font-light text-white opacity-70 mb-1 inline-block">
                  Search
                </Combobox.Label>
                <div>
                  <Combobox.Input
                    className="datasetInputs"
                    displayValue={(person: string) => (!person ? '' : person)}
                    onChange={(e) => {
                      console.log(e)
                    }}
                    placeholder="What Data Are You Looking For?"
                  />
                </div>
              </div>
            </Combobox>
          </div>
          <FilteringListBox
            className="xl:col-span-3 col-span-6 "
            label="Task Types"
            selectedData={selectedTaskType}
            setSelectedData={setSelectedTaskType}
            data={taskTypes}
          />
          <FilteringListBox
            className="xl:col-span-3 col-span-6 "
            label="Task Types"
            selectedData={selectedLabelFormat}
            setSelectedData={setSelectedLabelFormat}
            data={labelFormat}
          />

          <div className="xl:col-span-3 col-span-6 ">
            <Combobox value={minImgValue} onChange={setMinImgValue}>
              <div className="relative">
                <Combobox.Label className="text-[14px] leading-7 font-light text-white opacity-70 mb-1 inline-block">
                  Minimum Images
                </Combobox.Label>
                <div>
                  <Combobox.Input
                    className="datasetInputs"
                    placeholder="0"
                    onChange={(e) => {
                      const re = /^[0-9\b]+$/
                      if (e.target.value === '' || re.test(e.target.value)) {
                        setMinImgValue(e.target.value)
                      }
                    }}
                  />
                </div>
              </div>
            </Combobox>
          </div>
        </div>
      </div>
    </div>
  )
}
