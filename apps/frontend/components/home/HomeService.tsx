import clsx from 'clsx'
import Service from 'components/Service'
import { useCtx } from 'contexts/global'
import { motion } from 'framer-motion'
import { ServiceSection } from 'lib/types'
import { ReactElement, useRef, useState } from 'react'

export default function HomeService(data: ServiceSection): ReactElement {
  const { isWhite } = useCtx()
  const serviceRef = useRef<HTMLDivElement>(null)

  const [current, setCurrent] = useState(0)

  return (
    <section
      data-element="background"
      className={clsx(
        ' relative top-0 flex max-h-[6000px] py-section justify-center items-start !transition duration-700 ease-in-out',
        isWhite ? 'text-black' : 'text-white',
      )}
      style={{
        willChange: 'background',
        minHeight: `${data.items.length + 1}00vh`,
      }}
      ref={serviceRef}
    >
      <div className="container sticky top-[12%] bottom-[7%]  h-[91vh]  px-[40px] block flex-col justify-center items-center overflow-hidden">
        <div className="text-center text-head-1 font-[275]">{data.headline}</div>

        <div
          className="h-[80%] justify-around items-center"
          style={{
            willChange: `transform`,
            transformStyle: `preserve-3d`,
          }}
        >
          <div
            className="z-40 h-full w-full py-10"
            style={{ willChange: `transform, opacity`, transformStyle: `preserve-3d` }}
          >
            <div className="absolute left-0 top-[40%] z-50 translate-x-[-2rem] h-full py-10">
              <div className="flex-row space-y-2 relative z-60">
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
                      setCurrent(index)
                    }}
                  ></motion.div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden justify-center items-center w-full">
              {data.items.map((item, index) => (
                <motion.div
                  key={item.headline}
                  initial={{
                    y: '-50vh',
                  }}
                  animate={{
                    y: 0,
                  }}
                  className={clsx(current === index && 'opacity-0')}
                >
                  <Service
                    item={item}
                    index={index}
                    rootRef={serviceRef}
                    length={data.items.length + 1}
                    setCurrent={setCurrent}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
