import { GradientTitle } from 'components/common/GradientTitle'
import Button from 'components/ui/Button'
import { ProductSection } from 'lib/landingTypes'
import { ReactElement } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

export default function HomeProduct({
  body,
  ctaButton,
  headline,
  images,
  subHeadline,
}: ProductSection): ReactElement {
  return (
    <section className="container z-10 xl:my-40 lg:my-20 my-16 text-white">
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
        <div className="flex flex-col lg:col-span-6 col-span-12 space-y-5 bifrost__transparent_card md:py-[5rem] xl:px-[3.75rem] py-[3rem] px-[2rem]">
          <div className="flex flex-col space-y-3">
            <GradientTitle>{subHeadline}</GradientTitle>
            <h1 className="md:text-head-4 text-[28px] leading-[28px] font-[275]">{headline}</h1>
          </div>
          <div className="md:text-body-1 pt-1 text-[14px] leading-[20px] opacity-[0.7]">{body}</div>
          <div className="flex">
            <Button color="secondary">
              <a href={ctaButton.href}>{ctaButton.title}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
