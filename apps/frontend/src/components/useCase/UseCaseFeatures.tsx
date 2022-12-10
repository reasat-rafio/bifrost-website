import { GradientTitle } from 'src/components/common/GradientTitle'
import Button from 'src/components/ui/Button'
import { Description } from 'src/components/ui/Description'
import { Header } from 'src/components/ui/Header'
import { FeaturesSection } from 'src/lib/@types/useCaseTypes'
import { ReactElement } from 'react'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'src/utils/sanity'

export default function UseCaseFeatures({
  body,
  ctaButton,
  features,
  headline,
  subHeadline,
}: FeaturesSection): ReactElement {
  const { width: windowWidth } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  return (
    <div>
      <div className="container z-10 grid lg:grid-cols-2 grid-cols-1 gap-8 xl:pb-44 lg:pb-20 pb-14">
        <div className=" bifrost__transparent__card border-[#4e6181]/30 rounded-[15px] border flex flex-col justify-center xl:p-14 md:p-6 p-4 md:space-y-6 space-y-2">
          <GradientTitle>{subHeadline}</GradientTitle>
          <Header>{headline}</Header>
          <Description>{body}</Description>
          <div className="flex">
            <div>
              <Button>
                <a href={ctaButton.href}>{ctaButton.title}</a>
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {features.map((item) => {
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
