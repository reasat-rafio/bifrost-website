import { Listbox, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { BlogBody } from 'lib/@types/blogTypes'
import React, { Fragment, RefObject, useEffect, useState } from 'react'
import { Scrollspy } from './body/scrollspy'

interface ScrollSpyProps {
  sections: BlogBody[]
  sectionRefs: RefObject<HTMLDivElement>[]
}

export const ScrollSpyWrapper: React.FC<ScrollSpyProps> = ({ sections, sectionRefs, children }) => {
  const [sectionWrapperHeight, setSectionWrapperHeight] = useState(0)
  const [currentelElementIndex, setCurrentElementIndex] = useState(0)

  const [selected, setSelected] = useState<BlogBody | undefined>(sections[0])

  useEffect(() => {
    const selectedSection = sections.find((_, i) => {
      return i === currentelElementIndex
    })
    const sectionWrapperScrollHeight =
      document.querySelector("[data-cy='section-wrapper']")?.scrollHeight ?? 0
    setSelected(selectedSection)
    setSectionWrapperHeight(sectionWrapperScrollHeight)
  }, [currentelElementIndex, sections])

  return (
    <Scrollspy sectionRefs={sectionRefs} offset={-150}>
      {({ currentElementIndexInViewport }) => {
        setCurrentElementIndex(currentElementIndexInViewport)
        return (
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="col-span-3 relative">
              <div className="top-20 p-4 sticky hidden lg:block">
                <ul data-cy="nav-wrapper" className="space-y-6 w-[60%] mx-auto ">
                  {sections.map((section, i) => (
                    <li key={section._key} className="flex items-center space-x-4 ">
                      <span
                        style={{ transform: `matrix(-1, 0, 0, 1, 0, 0)` }}
                        className={clsx(
                          'h-[2px] w-[18px]',
                          currentElementIndexInViewport === i
                            ? 'bifrost__gradient_pink'
                            : 'bg-[#B5B5B5]',
                        )}
                      />
                      <a
                        href={`#section-${i}`}
                        onClick={(ev) => {
                          ev.preventDefault()
                          document.querySelector(`#section-${i}`)?.scrollIntoView()
                        }}
                        className={clsx(
                          'text-[20px] font-light',
                          currentElementIndexInViewport === i
                            ? 'text-[#000610] font-normal'
                            : 'text-[#B5B5B5]',
                        )}
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="block lg:hidden top-0 z-20 absolute w-full pointer-events-none"
                style={{ height: sectionWrapperHeight }}
              >
                <div className="sticky top-14 pointer-events-auto">
                  <Listbox value={selected} onChange={setSelected}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full py-3 px-4 text-left bg-copper-500 text-white rounded-[4px] text-body-sm flex items-center justify-between focus:outline-none">
                        {selected?.heading}
                        {/* {selected?.heading && <AngleDown className="fill-neutral-0" />} */}
                        {selected?.heading && 'DOWN'}
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-[4px] shadow-raise max-h-60 z-50 focus:outline-none">
                          {sections.map((section, i) => (
                            <Listbox.Option
                              key={section._key}
                              className={clsx('select-none relative py-2 pr-4 pl-10')}
                              value={section}
                            >
                              {({ active }) => (
                                <>
                                  <a
                                    href={`#section-${i}`}
                                    onClick={(ev) => {
                                      ev.preventDefault()
                                      document.querySelector(`#section-${i}`)?.scrollIntoView()
                                    }}
                                    className={clsx(
                                      active ? 'text-copper-500 font-bold' : 'text-neutral-600',
                                    )}
                                  >
                                    {section.heading}
                                  </a>
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
            </div>
            {children}
          </div>
        )
      }}
    </Scrollspy>
  )
}
