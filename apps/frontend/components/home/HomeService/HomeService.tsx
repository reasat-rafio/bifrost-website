import Service from 'components/Service'
import SlideUp from 'components/SlideUpText'
import { ServiceSection } from 'lib/@types/landingTypes'
import { ReactElement, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'
import { Pagination } from './Pagination'

export default function HomeService({ items, headline }: ServiceSection): ReactElement {
  const serviceRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  const [current, setCurrent] = useState(0)
  const [isScroll, setIsScroll] = useState(false)

  const { height: windowHeight } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  function setItem(index: number) {
    if (serviceRef.current) {
      setIsScroll(true)
      setCurrent(index)

      window.scrollTo({
        top:
          index === 0
            ? serviceRef.current.offsetTop + windowHeight
            : serviceRef.current.offsetTop + index * windowHeight,
        behavior: 'auto',
      })
      const checkIfScrollToIsFinished = setInterval(() => {
        const scrollTo = serviceRef.current.scrollHeight + index * windowHeight
        if (scrollTo < window.scrollY * 1.1 && scrollTo > window.scrollY * 0.9) {
          setIsScroll(false)
          clearInterval(checkIfScrollToIsFinished)
        }
      }, 25)
    }
  }

  return (
    <section className="container">
      <div className="text-center md:text-head-1 text-[28px] leading-[28px] font-[275] z-10 relative xl:my-32 lg:my-16 my-14">
        <SlideUp divRef={headingRef} text={headline} />
      </div>
      <div
        data-element="background"
        className="relative flex justify-center items-start transition duration-300 ease-in-out"
        style={{
          willChange: 'background',
          minHeight: `${items.length + 1}00vh`,
        }}
        ref={serviceRef}
      >
        <div className="sticky w-full top-0 h-screen">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 -translate-x-10">
            {items.map((_, index) => (
              <Pagination index={index} current={current} setItem={setItem} isScroll={isScroll} />
            ))}
          </div>

          <div className="h-full flex justify-center items-center ">
            <div className="h-fit w-full flex justify-center items-center ">
              {items.map((item, index) => (
                <div className="absolute w-full h-fit" key={item.headline}>
                  <Service
                    isScroll={isScroll}
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
      </div>
    </section>
  )
}
