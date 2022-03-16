import Button from 'components/ui/Button'
import { FeaturesSection } from 'lib/useCaseTypes'
import { ReactElement } from 'react'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

export default function UseCaseFeatures(data: FeaturesSection): ReactElement {
  console.log({ data })
  const { width: windowWidth } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  return (
    <div className=" ">
      <div className="container z-10 grid lg:grid-cols-2 grid-cols-1 gap-8">
        <div className=" bifrost__transparent__card border-[#4e6181]/30 rounded-[15px] border flex flex-col justify-center xl:p-14 md:p-6 p-4 md:space-y-6 space-y-2">
          <h6 className="bg-clip-text bifrost__gradient_green text-transparent uppercase lg:text-head-6 text-head-6">
            {data.subHeadline}
          </h6>
          <h4 className="lg:text-head-4 text-[35px] lead-[35px] font-[275]">{data.headline}</h4>
          <p className="lg:text-body-1 text-[14px] lead-[26px] font-[300] opacity-70">
            {data.body}
          </p>
          <div className="flex">
            <Button variant="secondary">
              <a href={data.ctaButton.href}>{data.ctaButton.title}</a>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {data.features.map((item) => {
            return (
              <div className="bifrost__transparent__card border-[#4e6181]/20 border rounded-[15px] group">
                <div className="w-full flex justify-center overflow-hidden rounded-[8px]">
                  <SanityImg
                    className="object-cover group-hover:scale-110 transition-all duration-300"
                    builder={imageUrlBuilder}
                    image={item.image}
                    alt={item.image?.alt || 'image'}
                    height={windowWidth >= 768 ? 250 : 150}
                  />
                </div>
                <p className="lg:text-body-2 text-center my-3">{item.title}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
