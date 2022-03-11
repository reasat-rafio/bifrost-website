import clsx from 'clsx'
import Service from 'components/Service'
import SlideUp from 'components/SlideUpText'
import { motion } from 'framer-motion'
import { ServiceSection } from 'lib/landingTypes'
import { ReactElement, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'

export default function HomeService(data: ServiceSection): ReactElement {
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
        top: serviceRef.current.scrollHeight + index * windowHeight,
        behavior: 'auto',
      })
      const checkIfScrollToIsFinished = setInterval(() => {
        const scrollTo = serviceRef.current.scrollHeight + index * windowHeight
        console.log(
          scrollTo < window.scrollY * 1.1 && scrollTo > window.scrollY * 0.9,
          {
            scrollTo,
          },
          window.scrollY,
        )
        if (scrollTo < window.scrollY * 1.1 && scrollTo > window.scrollY * 0.9) {
          // do something
          setIsScroll(false)
          clearInterval(checkIfScrollToIsFinished)
        }
      }, 25)
    }
  }

  return (
    <section>
      <div className="container flex justify-center items-center z-10 relative md:h-[60vh] h-[50vh] text-white">
        <div className="text-center md:text-head-1 text-[28px] leading-[28px] font-[275]">
          {headingRef.current && <SlideUp divRef={headingRef} text={data.headline} />}
        </div>
      </div>
      <div
        data-element="background"
        className="relative top-0 flex max-h-[6000px] py-section justify-center items-start !transition duration-300 ease-in-out"
        style={{
          willChange: 'background',
          minHeight: `${data.items.length + 1}00vh`,
        }}
        ref={serviceRef}
      >
        <div className="sticky md:container w-full md:m-[1rem] m-[0.50rem] top-0 h-[100vh] block flex-col justify-center items-center ">
          <div className="relative w-full h-full">
            <div className="absolute w-full z-50 h-full flex items-center justify-start">
              <div className="flex-row space-y-2 relative xl:translate-x-[-5vw] md:translate-x-[-3vw] translate-x-[-10vw]">
                {data.items.map((item, index) => {
                  return index === current ? (
                    <motion.div
                      whileHover={{
                        scale: 1.25,
                        transition: { ease: 'easeInOut', duration: 0.05 },
                      }}
                      style={{
                        background:
                          'linear-gradient(90deg, #F8E9FF 0%, #E4ACFF 35.3%, #7187FF 102.69%)',
                        padding: '2px',
                      }}
                      className="rounded-full z-0"
                    >
                      <motion.div
                        className="p-1 rounded-full cursor-pointer"
                        style={{
                          backgroundColor: '#FFF',
                          border:
                            '1px solid linear-gradient(90deg, #F8E9FF 0%, #E4ACFF 35.3%, #7187FF 102.69%)',
                        }}
                      ></motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={{
                        scale: 1.25,
                        transition: { ease: 'easeInOut', duration: 0.05 },
                      }}
                      style={{
                        background: 'transparent',
                        padding: '2px',
                      }}
                      className="rounded-full z-0 cursor-pointer"
                      onClick={() => {
                        if (!isScroll) setItem(index)
                      }}
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.25,
                          transition: { ease: 'easeInOut', duration: 0.05 },
                        }}
                        className={clsx(current === index && 'opacity-0', 'p-1 rounded-full')}
                        style={{ backgroundColor: '#757AAC' }}
                        key={item.headline}
                      ></motion.div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
            <div
              className="z-0 h-full w-full"
              style={{ willChange: `transform, opacity`, transformStyle: `preserve-3d` }}
            >
              <div
                className="h-full flex justify-center items-center"
                style={{
                  willChange: `transform`,
                  transformStyle: `preserve-3d`,
                }}
              >
                <div className="z-0 h-full w-full flex justify-center items-center">
                  {data.items.map((item, index) => (
                    <div
                      className="absolute justify-center items-center w-full h-full"
                      key={item.headline}
                    >
                      <Service
                        isScroll={isScroll}
                        item={item}
                        index={index}
                        rootRef={serviceRef}
                        length={data.items.length + 1}
                        setCurrent={setCurrent}
                        current={current}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
