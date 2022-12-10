import { GradientTitle } from 'src/components/common/GradientTitle'
import Button from 'src/components/ui/Button'
import { Description } from 'src/components/ui/Description'
import { Header } from 'src/components/ui/Header'
import { ProductSection } from 'src/lib/@types/landingTypes'
import { ReactElement } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'src/utils/sanity'

export default function HomeProduct({
  body,
  ctaButton,
  headline,
  images,
  subHeadline,
}: ProductSection): ReactElement {
  return (
    <section className="container z-10 xl:py-40 lg:py-20 py-16 text-white">
      <div className="grid grid-cols-12 space-y-5 lg:space-y-0 relative xl:space-x-12 lg:space-x-8">
        <div className="lg:col-span-6 col-span-12 lg:-mr-1/16 2xl:-mr-1/8 w-full self-center">
          <div className="grid grid-cols-2 xl:gap-4 gap-3">
            {images.map((image) => (
              <SanityImg
                key={image?.alt}
                builder={imageUrlBuilder}
                image={image}
                alt={image?.alt}
                height={250}
                className="w-full lg:max-h-[262px] object-cover rounded-[8px]"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:col-span-6 col-span-12 bifrost__transparent__card 2xl:p-14 lg:p-8 p-5 2xl:space-y-6 space-y-3 border border-[#4e6181]/30">
          <header className="flex flex-col space-y-3">
            <GradientTitle>{subHeadline}</GradientTitle>
            <Header>{headline}</Header>
          </header>
          <Description className="!pt-3">{body}</Description>
          <div className="flex">
            <Button>
              <a href={ctaButton.href}>{ctaButton.title}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
