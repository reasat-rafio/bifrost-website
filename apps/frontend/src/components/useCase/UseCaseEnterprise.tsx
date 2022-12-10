import { GradientTitle } from 'src/components/common/GradientTitle'
import { Pagination } from 'src/components/home/HomeService/Pagination'
import Service from 'src/components/Service'
import { Header } from 'src/components/ui/Header'
import { EnterpriseSection } from 'src/lib/@types/useCaseTypes'
import { ReactElement, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'

export default function UseCaseEnterprise({
  enterprises,
  headline,
  subHeadline,
}: EnterpriseSection): ReactElement {
  const serviceRef = useRef<HTMLDivElement>(null)

  const [current, setCurrent] = useState(0)
  // const [isScroll, setIsScroll] = useState(false)

  const { height: windowHeight } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  function setItem(index: number) {
    if (serviceRef.current) {
      // setIsScroll(true)
      setCurrent(index)
      window.scrollTo({
        top: serviceRef.current.scrollHeight + (index + 3) * windowHeight,
        behavior: 'auto',
      })
      const checkIfScrollToIsFinished = setInterval(() => {
        if (serviceRef.current.scrollHeight + (index + 3) * windowHeight === window.scrollY) {
          // do something
          // setIsScroll(false)
          clearInterval(checkIfScrollToIsFinished)
        }
      }, 25)
    }
  }

  return (
    <section className="container xl:pt-32 lg:pt-16 pt-14 ">
      <header className="max-w-2xl mx-auto ">
        <GradientTitle className="mx-auto">{subHeadline}</GradientTitle>
        <Header className="text-center">{headline}</Header>
      </header>
      <div
        data-element="background"
        className="relative flex justify-center items-start transition duration-300 ease-in-out"
        style={{
          willChange: 'background',
          minHeight: `${enterprises.length + 1}00vh`,
        }}
        ref={serviceRef}
      >
        <div className="sticky w-full top-0 h-screen">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 -translate-x-10">
            {enterprises.map((_, index) => (
              <Pagination index={index} current={current} setItem={setItem} />
            ))}
          </div>

          <div className="h-full flex justify-center items-center ">
            <div className="h-fit w-full flex justify-center items-center ">
              {enterprises.map((item, index) => (
                <div className="absolute w-full h-fit" key={item.headline}>
                  <Service
                    // isScroll={isScroll}
                    item={item}
                    index={index}
                    rootRef={serviceRef}
                    length={enterprises.length + 1}
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
