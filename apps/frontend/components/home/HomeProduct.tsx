import Button from 'components/ui/Button'
import { ProductSection } from 'lib/landingTypes'
import { ReactElement } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

export default function HomeProduct(data: ProductSection): ReactElement {
  return (
    <div className="container z-10 my-20 text-white">
      <div className="grid grid-cols-12 space-y-5 lg:space-y-0 relative xl:space-x-12 lg:space-x-8">
        <div className="lg:col-span-6 col-span-12 lg:-mr-1/16 2xl:-mr-1/8 w-full self-center">
          <div className="grid grid-cols-2 xl:gap-4 gap-3">
            {data.images.map((image) => (
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
            <h3 className="md:text-body-1 text-[18px] leading-[22.86px] font-[400] bifrost__gradient_green text-transparent bg-clip-text uppercase">
              {data.subHeadline}
            </h3>
            <h1 className="md:text-head-4 text-[28px] leading-[28px] font-[275]">
              {data.headline}
            </h1>
          </div>
          <div className="md:text-body-1 pt-1 text-[14px] leading-[20px] opacity-[0.7]">
            {data.body}
          </div>
          <div className="flex">
            <Button color="secondary">
              <a href={data.ctaButton.href}>{data.ctaButton.title}</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
