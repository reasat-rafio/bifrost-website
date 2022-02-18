import clsx from 'clsx'
import Service from 'components/Service'
import { motion } from 'framer-motion'
import { ServiceSection } from 'lib/types'
import { ReactElement, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'

export default function HomeService(data: ServiceSection): ReactElement {
  const serviceRef = useRef<HTMLDivElement>(null)

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
        top: serviceRef.current.scrollHeight + (index + 3) * windowHeight,
        behavior: 'auto',
      })
      const checkIfScrollToIsFinished = setInterval(() => {
        if (serviceRef.current.scrollHeight + (index + 3) * windowHeight === window.scrollY) {
          // do something
          setIsScroll(false)
          clearInterval(checkIfScrollToIsFinished)
        }
      }, 25)
    }
  }

  return (
    <div>
      <section
        data-element="background"
        className="relative top-0 flex max-h-[6000px] py-section justify-center items-start !transition duration-300 ease-in-out"
        style={{
          willChange: 'background',
          minHeight: `${data.items.length + 1}00vh`,
        }}
        ref={serviceRef}
      >
        <div className="sticky md:top-[12%] top-[20%] bottom-[7%] h-[91vh] block flex-col justify-center items-center overflow-hidden">
          <div className="relative container w-full h-full">
            <div className="text-center text-[1px] leading-[1px] font-[275] opacity-0 w-[100vw] mt-[10vh]">
              {data.headline}
            </div>

            <div className="absolute md:left-[2.5rem] left-[0.5rem] md:top-[25%] top-[20%] z-50 h-full py-10">
              <div className="md:flex-row flex-col space-y-2 relative z-60">
                <motion.div
                  animate={{
                    translateY: `${current * 1 - 0.1}rem`,
                    translateX: '-0.1rem',
                  }}
                  whileHover={{
                    scale: 1.25,
                    transition: { ease: 'easeInOut', duration: 0.05 },
                  }}
                  style={{
                    background:
                      'linear-gradient(90deg, #F8E9FF 0%, #E4ACFF 35.3%, #7187FF 102.69%)',
                    padding: '2px',
                  }}
                  className="absolute rounded-full z-0"
                >
                  <motion.div
                    className="p-1 rounded-full"
                    style={{
                      backgroundColor: '#FFF',
                      border:
                        '2px solid linear-gradient(90deg, #F8E9FF 0%, #E4ACFF 35.3%, #7187FF 102.69%)',
                    }}
                  ></motion.div>
                </motion.div>
                {data.items.map((item, index) => (
                  <motion.div
                    whileHover={{
                      scale: 1.25,
                      transition: { ease: 'easeInOut', duration: 0.05 },
                    }}
                    className={clsx(
                      current === index && 'opacity-0',
                      'p-1 rounded-full cursor-pointer',
                    )}
                    style={{ backgroundColor: '#757AAC' }}
                    key={item.headline}
                    onClick={() => {
                      if (!isScroll) setItem(index)
                    }}
                  ></motion.div>
                ))}
              </div>
            </div>
            <div
              className="z-0 overflow-hidden h-full w-full"
              style={{ willChange: `transform, opacity`, transformStyle: `preserve-3d` }}
            >
              <div
                className="h-[80%] justify-center items-center"
                style={{
                  willChange: `transform`,
                  transformStyle: `preserve-3d`,
                }}
              >
                <div className="z-0 overflow-hidden h-full w-full">
                  {data.items.map((item, index) => (
                    <div
                      className="absolute justify-center items-center w-full"
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
      </section>
    </div>
  )
}
