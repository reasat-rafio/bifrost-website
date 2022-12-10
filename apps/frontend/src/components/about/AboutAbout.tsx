import { GradientTitle } from 'src/components/common/GradientTitle'
import { Description } from 'src/components/ui/Description'
import { Header } from 'src/components/ui/Header'

import { AboutSection } from 'src/lib/@types/aboutUsTypes'
import { ReactElement } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'src/utils/sanity'

export default function AboutAbout({
  body,
  ctaButton,
  headline,
  image,
  subHeadline,
}: AboutSection): ReactElement {
  return (
    <section className="mx-[1.6rem]">
      <div className="3xl:container 2xl:max-w-6xl  max-w-5xl mx-auto xl:py-40 lg:py-20 py-16 grid md:grid-cols-12 grid-cols-6 z-10">
        <div className="col-span-6">
          <div className="md:translate-x-[20%] translate-x-0 w-full md:h-full sm:h-[400px] h-[280px]">
            <SanityImg
              className="w-full h-full object-cover rounded-[15px]"
              builder={imageUrlBuilder}
              image={image}
              height={500}
              alt={image?.alt || 'image'}
            />
          </div>
        </div>
        <div className="col-span-6 flex items-center justify-center md:mx-0 mx-5 transform -translate-y-[20%] md:translate-y-0">
          <div className="lg:p-12 p-6 bifrost__transparent_card rounded-lg flex flex-col lg:space-y-6 space-y-2">
            <GradientTitle>{subHeadline}</GradientTitle>
            <Header>{headline}</Header>
            <Description>{body}</Description>

            <div className="flex">
              <button className="space-x-4 py-2">
                <object
                  type="image/svg+xml"
                  height="64"
                  width="64"
                  data="play.svg"
                  className="inline-block"
                />
                <span className="underline text-[16px] leading-[16px]">{ctaButton.title}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
