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
    <div className="relative overflow-y-clip my-36">
      <div className="container lg:pt-16 z-10 relative overflow-y-clip text-white grid grid-cols-12 gap-8">
        <div className="col-span-6 bifrost__transparent_card flex flex-col justify-center px-14 space-y-6">
          <div className="bg-clip-text bifrost__gradient_green text-transparent uppercase lg:text-head-6 text-head-6">
            {data.subHeadline}
          </div>
          <div className="lg:text-head-4 text-[35px] lead-[35px] font-[275]">{data.headline}</div>
          <div className="lg:text-body-1 text-[14px] lead-[26px] font-[300] opacity-70">
            {data.body}
          </div>
          <Button className="flex items-start" color="secondary">
            <a href={data.ctaButton.href}>{data.ctaButton.title}</a>
          </Button>
        </div>
        <div className="col-span-6 grid grid-cols-12 gap-4">
          {data.features.map((item) => {
            return (
              <div className="col-span-6 bifrost__transparent_card">
                <div className="w-full flex justify-center ">
                  <SanityImg
                    className="rounded-md object-cover"
                    builder={imageUrlBuilder}
                    image={item.image}
                    alt={item.image?.alt || 'image'}
                    height={windowWidth >= 768 ? 250 : 150}
                  />
                </div>
                <div className="lg:text-body-2 text-center my-3">{item.title}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
