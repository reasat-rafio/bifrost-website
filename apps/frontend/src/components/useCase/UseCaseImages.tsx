import { Description } from 'src/components/ui/Description'
import { Header } from 'src/components/ui/Header'
import { ImagesSection } from 'src/lib/@types/useCaseTypes'
import { ReactElement } from 'react'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'src/utils/sanity'

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
    <div className="z-10 relative xl:py-40 lg:py-20 py-16">
      <div className="container md:space-y-12 space-y-6">
        <header className="grid lg:grid-cols-2 gap-5 grid-cols-1">
          <Header>{headline}</Header>
          <Description>{subHeadline}</Description>
        </header>
        <div className="grid grid-cols-12 gap-8">
          {examples.map((item) => {
            return (
              <div
                className="xl:col-span-4 md:col-span-6 col-span-12 group bifrost__transparent__card border border-[#4e6181]/30 p-3 rounded-[8px] lg:space-y-4 space-y-2"
                key={item._key}
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
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}