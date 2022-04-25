import { Listbox, Transition } from '@headlessui/react'
import React, { Dispatch, SetStateAction } from 'react'

interface FilteringListBoxProps {
  label: string
  selectedData: any
  setSelectedData: Dispatch<SetStateAction<any>>
  data: any[]
  className?: string
}

export const FilteringListBox: React.FC<FilteringListBoxProps> = ({
  label,
  selectedData,
  setSelectedData,
  data,
  className,
}) => {
  return (
    <div className={className}>
      <Listbox value={selectedData} onChange={setSelectedData}>
        <div className="relative">
          <Listbox.Label className="text-[14px] leading-7 font-light text-white opacity-70 mb-1 inline-block">
            {label}
          </Listbox.Label>
          <div>
            <Listbox.Button className="datasetInputs mr-auto flex">{selectedData}</Listbox.Button>

            <Transition
              enter="transition duration-200 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-150 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Listbox.Options className="absolute w-full mt-2 overflow-auto max-h-80 border rounded-[6px] border-[#C9FF71]/20 background__dark  scrollbar-thumb-honeySuckle scrollbar-thin scrollbar-track-gray-100 py-2 z-30">
                {data.map(({ name, _id }) => (
                  <Listbox.Option
                    className="hover:bg-gradient-to-l from-[#f8e9ff] via-[#e4acff] to-[#7187ff] hover:text-transparent duration-300 hover:bg-clip-text opacity-70 text-white text-[18px] font-light cursor-pointer capitalize transition-none px-4 py-1"
                    key={_id}
                    value={name}
                  >
                    {name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      </Listbox>
    </div>
  )
}
