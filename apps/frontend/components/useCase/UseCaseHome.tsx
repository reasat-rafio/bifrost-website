import { GradientTitle } from 'components/common/GradientTitle'
import ThreeJSWaves from 'components/ThreeJSWaves'
import Button from 'components/ui/Button'
import { HomeSection } from 'lib/@types/useCaseTypes'
import { ReactElement } from 'react'

export default function UseCaseHome({
  body,
  ctaButton,
  headline,
  subHeadline,
}: HomeSection): ReactElement {
  return (
    <div className="relative overflow-y-clip">
      <div className="absolute z-0 left-0 bottom-0 w-full h-full flex items-end">
        <div className="relative translate-y-[25vh]">
          <ThreeJSWaves />
        </div>
      </div>
      <div className="container min-h-screen overflow-y-clip lg:py-[5%] py-[30%] flex flex-col justify-center items-center">
        <div className="text-center max-w-4xl flex flex-col lg:space-y-12 space-y-8">
          <GradientTitle className="mx-auto">{subHeadline}</GradientTitle>
          <h1 className="lg:text-head-1 text-[54px] leading-snug lg:leading-[82px] font-[275]">
            {headline}
          </h1>
          <p className="lg:text-body-2 text-body-2 font-[300] opacity-70">{body}</p>
          <div className="flex mx-auto">
            <Button>
              <a href={ctaButton.href}>{ctaButton.title}</a>
            </Button>
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
