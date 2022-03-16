import clsx from 'clsx'
import ThreeJSWaves from 'components/ThreeJSWaves'
import { HomeSection } from 'lib/blogTypes'
import { ReactElement } from 'react'

export default function BlogHome(data: HomeSection): ReactElement {
  console.log({ data })

  return (
    <div className="relative overflow-y-clip">
      <div className="absolute z-0 left-0 bottom-0 w-full h-full flex items-end">
        <div className="relative translate-y-[25vh]">
          <ThreeJSWaves />
        </div>
      </div>
      <div
        className={clsx(
          'container lg:pt-16 pt-24 flex flex-col xl:w-[60%] justify-center items-center text-center z-10 md:space-y-8 space-y-8 relative w-[100vw] min-h-[100vh] overflow-y-clip lg:py-0 py-52',
          'text-white',
        )}
      >
        <div className="bg-clip-text bifrost__gradient__green text-transparent uppercase lg:text-head-6 text-head-6">
          {data.subHeadline}
        </div>
        <div className="lg:text-head-1 text-[82px] leading-[82px] font-[275]">{data.headline}</div>
      </div>
      <div
        className="z-10 absolute bottom-0 left-0 h-[30vh] w-full"
        style={{ background: 'linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)' }}
      ></div>
    </div>
  )
}
