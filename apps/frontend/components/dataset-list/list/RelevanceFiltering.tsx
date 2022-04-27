import { Listbox, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
// import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

interface RelevanceFilteringProps {
  length: number
}

const relevances = [
  {
    name: 'Most No. of Images',
  },
  {
    name: 'Most No. of Classes',
  },
  {
    name: 'Most No. of Labels',
  },
  {
    name: 'Most Recent',
  },
]

export const RelevanceFiltering: React.FC<RelevanceFilteringProps> = ({ length }) => {
  const [selected, setSelected] = useState(relevances[relevances.length - 1])
  return (
    <div className="flex w-full justify-between my-10 items-center">
      <span className="flex-1 text-[16px] text-opacity-70 text-white underline ">
        {length} datasets found
      </span>
      <div>
        <Listbox value={selected} onChange={setSelected}>
          <div className="xl:relative mt-1 xl:w-52 w-44">
            <Listbox.Button className="w-full ml-2 py-2 flex justify-center items-center sm:text-sm space-x-4">
              <span className="block truncate xl:text-[18px] text-[16px] font-light tracking-[0.02em]">
                {selected.name}
              </span>
              <span className="inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 14 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.75L7 7.75L13 1.75"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              enter="transition duration-200 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-150 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Listbox.Options className="absolute xl:w-full w-44 py-1 mt-1 overflow-auto text-base rounded-[6px] border border-[#C9FF71]/20 shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm __transparent__background ">
                {relevances.map((data, dataIdx) => (
                  <Listbox.Option
                    key={dataIdx}
                    className={({ active }) =>
                      `cursor-pointer  relative py-2 pl-10 xl:pr-4 ${
                        active ? 'text-amber-900 bg-honeySuckle' : 'text-gray-900'
                      }`
                    }
                    value={data}
                  >
                    {({ selected }) => (
                      <>
                        <span className="block truncate xl:text-base text-sm">{data.name}</span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neonBlue">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  )
}
