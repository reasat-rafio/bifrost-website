import clsx from 'clsx'
import { AboutSection } from 'lib/aboutUsTypes'
import { ReactElement } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

export default function AboutAbout(data: AboutSection): ReactElement {
  console.log({ data })

  return (
    <div className="relative overflow-y-clip">
      <div
        className={clsx(
          'container xl:pt-16 pt-24 grid md:grid-cols-12 grid-cols-6 z-10 md:space-y-8 space-y-8 relative w-[100vw]',
          'text-white',
        )}
      >
        <div className="relative col-span-6 w-full">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="md:translate-x-[20%] w-full">
              <SanityImg
                className="w-full lg:object-cover object-contain rounded-lg"
                builder={imageUrlBuilder}
                image={data.image}
                height={500}
                alt={data.image?.alt || 'image'}
              />
            </div>
          </div>
        </div>
        <div className="col-span-6 flex items-center justify-center">
          <div className="lg:p-12 p-6 bifrost__transparent_card rounded-lg flex flex-col items-start space-y-6 xl:w-[35vw] lg:w-[45vw] md:w-[60vw] w-[95%]">
            <div className="bg-clip-text bifrost__gradient_green text-transparent uppercase lg:text-head-6 text-head-6">
              {data.subHeadline}
            </div>
            <div className="lg:text-head-4 text-[35px] lead-[35px] font-[275]">{data.headline}</div>
            <div className="lg:text-body-1 text-[14px] lead-[26px] font-[300] opacity-70">
              {data.body}
            </div>

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
              {/* <Button> */}
              {/*   <a href={data.ctaButton.href}>{data.ctaButton.title}</a> */}
              {/* </Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
