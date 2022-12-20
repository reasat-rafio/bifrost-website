import Service from 'src/components/Service'
import { ServiceSection } from 'src/lib/@types/landingTypes'
import { ReactElement, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'
import { Pagination } from './Pagination'
import { motion } from 'framer-motion'

export default function HomeService({ items, headline }: ServiceSection): ReactElement {
  const serviceRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const lines = headline?.split(/\r\n|\n/)
  const { height: windowHeight } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  const setItem = (index: number) => {
    if (serviceRef.current) {
      setCurrent(index)
      window.scrollTo({
        top: serviceRef.current.getBoundingClientRect().top + window.scrollY + index * windowHeight,
        behavior: 'auto',
      })
    }
  }

  return (
    <section className="container xl:py-32 lg:py-16 py-14">
      <header className="text-center md:text-head-1 text-head-4-mobile leading-none font-primary z-10 relative">
        {lines.map((line) => (
          <motion.h3
            className="whitespace-pre-wrap"
            initial={{ opacity: 0, y: '150%' }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'tween', duration: 1, ease: 'backInOut' }}
          >
            {line}
          </motion.h3>
        ))}
      </header>
      <section
        ref={serviceRef}
        data-element="background"
        className="relative flex justify-center items-start transition duration-300 ease-in-out"
        style={{
          willChange: 'background',
          minHeight: `${items.length + 1}00vh`,
        }}
      >
        <div className="sticky w-full top-0 h-screen">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 -translate-x-10">
            {items.map((_, index) => (
              <Pagination index={index} current={current} setItem={setItem} />
            ))}
          </div>

          <div className="h-full flex justify-center items-center ">
            <div className="h-fit w-full flex justify-center items-center ">
              {items.map((item, index) => (
                <div className="absolute w-full h-fit" key={item.headline}>
                  <Service
                    item={item}
                    index={index}
                    rootRef={serviceRef}
                    length={items.length + 1}
                    setCurrent={setCurrent}
                    current={current}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
