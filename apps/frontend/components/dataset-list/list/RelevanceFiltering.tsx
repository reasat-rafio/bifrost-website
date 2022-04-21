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
      <span className="flex-1 text-[16px] opacity-70 text-white underline">
        {length} datasets found
      </span>
      <div>
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1 w-52">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-transparent rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="block truncate text-[18px] font-light tracking-[0.02em]">
                {selected.name}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
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
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base rounded-[6px] border border-[#C9FF71]/20 shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm background__dark">
                {relevances.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `cursor-pointer  relative py-2 pl-10 pr-4 ${
                        active ? 'text-amber-900 bg-honeySuckle' : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          {person.name}
                        </span>
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
