import React, { useEffect, useState } from 'react'
import { Combobox } from '@headlessui/react'
import { FilteringListBox } from './FilteringListBox'
import useDatasetStore from 'store/dataset.store'

interface SearchAndFilteringProps {}

export const SearchAndFiltering: React.FC<SearchAndFilteringProps> = ({}) => {
  const {
    allLabelFormat,
    setSelectedLabelFormat,
    selectedLabelFormat,
    allTaskTypes,
    setSelectedTaskType,
    selectedTaskType,
  } = useDatasetStore()
  const [seachInputFieldValue, setSearchInputFieldValue] = useState('')
  const [minImgValue, setMinImgValue] = useState<string | number>(0)

  useEffect(() => {
    setSelectedLabelFormat(allLabelFormat[0])
    setSelectedTaskType(allTaskTypes[0])
  }, [])

  return (
    <div className="w-full relative z-30">
      <div className="rounded-[6px] border-[#C9FF71]/30 __transparent__background border">
        <div className="grid xl:grid-cols-13 grid-cols-12 p-4 xl:gap-4 gap-3">
          <div className="xl:col-span-4 col-span-6">
            <Combobox value={seachInputFieldValue} onChange={setSearchInputFieldValue}>
              <div className="relative">
                <Combobox.Label className="text-[14px] leading-7 font-light text-white opacity-70 mb-1 inline-block">
                  Search
                </Combobox.Label>
                <div>
                  <Combobox.Input
                    className="datasetInputs"
                    displayValue={(person: string) => (!person ? '' : person)}
                    onChange={(e) => {
                      setSearchInputFieldValue(e.target.value)
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
            data={allTaskTypes}
          />
          <FilteringListBox
            className="xl:col-span-3 col-span-6 "
            label="Label Format"
            selectedData={selectedLabelFormat}
            setSelectedData={setSelectedLabelFormat}
            data={allLabelFormat}
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
                    onChange={(e: any) => {
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
