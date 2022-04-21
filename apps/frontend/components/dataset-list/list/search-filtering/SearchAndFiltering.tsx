import { GradientBorder } from 'components/common/GradientBorder'
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
    <div className="w-cover-full">
      <GradientBorder
        gradient="bg-gradient-to-r from-[#eeffe9]/30 via-[#acffeb]/30 to-[#c9ff71]/30"
        borderRadious="6px"
      >
        <div className="grid grid-cols-13 p-4 gap-4">
          <div className="xl:col-span-4 col-span-12">
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
            className="xl:col-span-3 hidden xl:block"
            label="Task Types"
            selectedData={selectedTaskType}
            setSelectedData={setSelectedTaskType}
            data={taskTypes}
          />
          <FilteringListBox
            className="xl:col-span-3 hidden xl:block"
            label="Task Types"
            selectedData={selectedLabelFormat}
            setSelectedData={setSelectedLabelFormat}
            data={labelFormat}
          />

          <div className="xl:col-span-3 hidden xl:block">
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
      </GradientBorder>
    </div>
  )
}
