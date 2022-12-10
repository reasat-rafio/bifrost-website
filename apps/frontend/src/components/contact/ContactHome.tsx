import ThreeJSWaves from 'src/components/ThreeJSWaves'
import { NoiseBackground } from 'src/components/ui/NoiseBackground'
import { HomeSection } from 'src/lib/@types/contactUsTypes'
import { Dispatch, ReactElement, SetStateAction, useCallback } from 'react'
import { PortableText } from 'src/utils/sanity'

interface IHomeSection extends HomeSection {
  setHeroSectionHeight: SetStateAction<Dispatch<number>>
}

export default function ContactHome(data: IHomeSection): ReactElement {
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const handleWidth = () => data.setHeroSectionHeight(node.clientHeight)
      handleWidth()
      window.addEventListener('resize', handleWidth)
      window.addEventListener('load', handleWidth)
    }
  }, [])
  return (
    <div className="fixed top-0 left-0 w-full overflow-y-clip " ref={measuredRef}>
      <NoiseBackground />
      <div className="absolute z-0 left-0 bottom-0 w-full h-full flex items-end">
        <div className="relative translate-y-[25vh]">
          <ThreeJSWaves />
        </div>
      </div>

      <div className="container min-h-screen flex lg:py-[5%] py-[30%]">
        <div className="grid grid-cols-12 justify-center items-center w-full m-auto gap-y-20 z-10">
          <div className="col-span-12">
            <h1 className="lg:text-head-2 text-[55px] leading-tight lg:leading-[82px] font-[275] bg-clip-text bifrost__gradient__green text-transparent max-w-[420px]">
              {data.headline}
            </h1>
          </div>
          <div className="col-span-12 grid lg:grid-cols-3 grid-cols-1 gap-10">
            {data.items.map((item) => (
              <div className="flex flex-col space-y-4" key={item.name}>
                <div className="text-head-5 font-[375]">{item.name}</div>
                <div className="h-full bifrost__transparent_card p-5 flex items-center backdrop-blur-3xl text-body-2">
                  <PortableText blocks={item.body} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="absolute pointer-events-none bottom-0 left-0 h-[30vh] w-full"
        style={{ background: 'linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)' }}
      ></div>
    </div>
  )
}
