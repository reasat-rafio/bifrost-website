import ThreeJSWaves from 'components/ThreeJSWaves'
import Button from 'components/ui/Button'
import { HomeSection } from 'lib/useCaseTypes'
import { ReactElement } from 'react'

export default function UseCaseHome(data: HomeSection): ReactElement {
  return (
    <div className="relative overflow-y-clip">
      <div className="absolute z-0 left-0 bottom-0 w-full h-full flex items-end">
        <div className="relative translate-y-[25vh]">
          <ThreeJSWaves />
        </div>
      </div>
      <div className="container min-h-screen overflow-y-clip lg:py-[5%] py-[30%] flex flex-col justify-center items-center">
        <div className="text-center max-w-4xl flex flex-col lg:space-y-12 space-y-8">
          <h2 className="bg-clip-text bifrost__gradient_green text-transparent uppercase lg:text-head-6 text-head-6">
            {data.subHeadline}
          </h2>
          <h1 className="lg:text-head-1 text-[54px] leading-snug lg:leading-[82px] font-[275]">
            {data.headline}
          </h1>
          <p className="lg:text-body-2 text-body-2 font-[300] opacity-70">{data.body}</p>
          <div className="flex mx-auto">
            <Button variant="secondary">
              <a href={data.ctaButton.href}>{data.ctaButton.title}</a>
            </Button>
          </div>
        </div>
      </div>
      <div
        className="z-10 absolute bottom-0 left-0 h-[30vh] w-full"
        style={{ background: 'linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)' }}
      ></div>
    </div>
  )
}
