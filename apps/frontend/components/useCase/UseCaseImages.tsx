import { ImagesSection } from 'lib/useCaseTypes'
import { ReactElement } from 'react'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

export default function UseCaseImages(data: ImagesSection): ReactElement {
  console.log({ data })
  const { width: windowWidth } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  return (
    <div className="relative overflow-y-clip">
      <div className="container lg:pt-16 z-10 md:space-y-12 space-y-6 relative min-h-[100vh] overflow-y-clip text-white">
        <div className="grid grid-cols-12">
          <div className="lg:text-head-4 text-head-6 col-span-6 font-[275]">{data.headline}</div>
          <div className="lg:text-body-1 text-[14px] leading-[24px] col-span-6 opacity-70">
            {data.subHeadline}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-8">
          {data.examples.map((item) => {
            return (
              <div className="col-span-4 p-4 bifrost__transparent_card space-y-4">
                <div className="w-full flex justify-center ">
                  <SanityImg
                    className="rounded-md object-cover"
                    builder={imageUrlBuilder}
                    image={item.image}
                    alt={item.image?.alt || 'image'}
                    height={windowWidth >= 768 ? 250 : 150}
                  />
                </div>
                <div className="lg:text-body-2">{item.title}</div>
                <div className="lg:text-[14px] lg:leading-[24px]">{item.body}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
