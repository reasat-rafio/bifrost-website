import clsx from 'clsx'
import Enterprise from 'components/Enterprise'
import { motion } from 'framer-motion'
import { EnterpriseSection } from 'lib/useCaseTypes'
import { ReactElement, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'

export default function UseCaseEnterprise(data: EnterpriseSection): ReactElement {
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
          minHeight: `${data.enterprises.length + 1}00vh`,
        }}
        ref={serviceRef}
      >
        <div className="sticky md:container w-full md:m-[1rem] m-[0.50rem] top-0 h-[100vh] block flex-col justify-center items-center">
          <div className="relative w-full h-full">
            <div className="absolute w-full z-0 h-full flex items-center justify-start">
              <div className="flex-row space-y-2 relative translate-x-[-5vw] z-60">
                {data.enterprises.map((item, index) => {
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
                        className="p-1 rounded-full"
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
                      className="rounded-full z-0"
                    >
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
                        key={item.title}
                        onClick={() => {
                          if (!isScroll) setItem(index)
                        }}
                      ></motion.div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
            <div
              className="z-0 overflow-hidden h-full w-full"
              style={{ willChange: `transform, opacity`, transformStyle: `preserve-3d` }}
            >
              <div
                className="h-full flex justify-center items-center"
                style={{
                  willChange: `transform`,
                  transformStyle: `preserve-3d`,
                }}
              >
                <div className="z-0 overflow-hidden h-full w-full flex justify-center items-center">
                  {data.enterprises.map((item, index) => (
                    <div
                      className="absolute justify-center items-center w-full h-full"
                      key={item.title}
                    >
                      <Enterprise
                        isScroll={isScroll}
                        item={item}
                        index={index}
                        rootRef={serviceRef}
                        length={data.enterprises.length + 1}
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