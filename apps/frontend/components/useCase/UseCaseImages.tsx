import { GradientBorder } from 'components/common/GradientBorder'
import { ImagesSection } from 'lib/useCaseTypes'
import { ReactElement } from 'react'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

export default function UseCaseImages({
  subHeadline,
  examples,
  headline,
}: ImagesSection): ReactElement {
  const { width: windowWidth } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  return (
    <div className="z-10 relative xl:my-40 lg:my-20 my-16">
      <div className="container md:space-y-12 space-y-6">
        <div className="grid lg:grid-cols-2 gap-5 grid-cols-1">
          <h4 className="lg:text-head-4 text-head-6 font-[275]">{headline}</h4>
          <p className="lg:text-body-1 text-[14px] leading-[24px] opacity-70">{subHeadline}</p>
        </div>
        <div className="grid grid-cols-12 gap-8">
          {examples.map((item) => {
            return (
              <GradientBorder
                key={item._key}
                gradient="bg-gradient-to-r from-[#F8E9FF]/30 via-[#E4ACFF]/200 to-[#7187FF]/30"
                borderRadious="10px"
                borderSize="0.85px"
                innerClass="h-full p-3 rounded-[8px] lg:space-y-4 space-y-2"
                className="xl:col-span-4 md:col-span-6 col-span-12 group"
              >
                <div className="w-full flex justify-center h-[70%] overflow-hidden rounded-[14px]">
                  <SanityImg
                    className="object-cover w-full h-full group-hover:scale-110 transition-all duration-300"
                    builder={imageUrlBuilder}
                    image={item.image}
                    alt={item.image?.alt || 'image'}
                    height={windowWidth >= 768 ? 250 : 150}
                  />
                </div>
                <h6 className="lg:text-body-2">{item.title}</h6>
                <p className="lg:text-[14px] lg:leading-[24px]">{item.body} </p>
              </GradientBorder>
            )
          })}
        </div>
      </div>
    </div>
  )
}
