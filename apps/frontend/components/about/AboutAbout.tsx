import { AboutSection } from 'lib/aboutUsTypes'
import { ReactElement } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

export default function AboutAbout(data: AboutSection): ReactElement {
  return (
    <section className="mx-[1.6rem]">
      <div className="3xl:container 2xl:max-w-6xl  max-w-5xl mx-auto xl:my-40 lg:my-20 my-16 grid md:grid-cols-12 grid-cols-6 z-10">
        <div className="col-span-6">
          <div className="md:translate-x-[20%] translate-x-0 w-full md:h-full sm:h-[400px] h-[280px]">
            <SanityImg
              className="w-full h-full object-cover rounded-[15px]"
              builder={imageUrlBuilder}
              image={data.image}
              height={500}
              alt={data.image?.alt || 'image'}
            />
          </div>
        </div>
        <div className="col-span-6 flex items-center justify-center md:mx-0 mx-5 transform -translate-y-[20%] md:translate-y-0">
          <div className="lg:p-12 p-6 bifrost__transparent_card rounded-lg flex flex-col lg:space-y-6 space-y-2">
            <h6 className="bg-clip-text bifrost__gradient_green text-transparent uppercase lg:text-head-6 text-head-6">
              {data.subHeadline}
            </h6>
            <h4 className="lg:text-head-4 text-[35px] leading-snug font-[275]">{data.headline}</h4>
            <p className="lg:text-body-1 text-[14px] lead-[26px] font-[300] opacity-70">
              {data.body}
            </p>

            <div className="flex">
              <button className="space-x-4 py-2">
                <object
                  type="image/svg+xml"
                  height="64"
                  width="64"
                  data="play.svg"
                  className="inline-block"
                />
                <span className="underline text-[16px] leading-[16px]">{data.ctaButton.title}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
