import { Listbox, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { BlogBody } from 'lib/@types/blogTypes'
import { useIntersection } from 'lib/hooks'
import React, { Dispatch, Fragment, useRef } from 'react'
import { motion } from 'framer-motion'
import { fadeInOut } from 'animations/fade-in-out'

interface SmScrollSpyProps {
  sectionWrapperHeight: number
  paddingY: number
  selected: BlogBody | undefined
  setSelected: Dispatch<React.SetStateAction<BlogBody>>
  sections: BlogBody[]
}

export const SmScrollSpy: React.FC<SmScrollSpyProps> = ({
  sectionWrapperHeight,
  paddingY,
  selected,
  setSelected,
  sections,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)

  const sectionOnview = useIntersection(sectionRef, { threshold: 0.2 })

  return (
    <div
      className="block lg:hidden top-0 z-20 absolute w-full pointer-events-none "
      style={{ height: sectionWrapperHeight }}
      ref={sectionRef}
    >
      <motion.div
        variants={fadeInOut()}
        initial="from"
        animate={sectionOnview?.isIntersecting ? 'to' : 'from'}
        className="sticky pointer-events-auto bifrost__gradient_pink  shadow"
        style={{ top: `${paddingY - paddingY / 5}px` }}
      >
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full py-3 px-4 text-left bg-copper-500 text-black rounded-[4px] text-body-sm flex items-center justify-between focus:outline-none">
              {selected?.heading}
              {selected?.heading && <img className="h-4 w-4" src="/icons/chervron-down.svg" />}
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bifrost__gradient_pink rounded-[4px] shadow-raise max-h-60 z-50 focus:outline-none shadow-md">
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
      </motion.div>
    </div>
  )
}
