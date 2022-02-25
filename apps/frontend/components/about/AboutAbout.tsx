import clsx from 'clsx'
import Button from 'components/ui/Button'
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
          'container lg:pt-16 pt-24 grid grid-cols-2 z-10 md:space-y-8 space-y-8 relative w-[100vw] min-h-[100vh] overflow-y-clip lg:py-0 py-52',
          'text-white',
        )}
      >
        <div className="relative col-span-1">
          <div className="absolute left-[15%] top-[10%] h-[100%] w-[100%]">
            <SanityImg
              className="w-full h-full lg:object-cover object-contain rounded-lg"
              builder={imageUrlBuilder}
              image={data.image}
              height={500}
              alt={data.image?.alt || 'image'}
            />
          </div>
        </div>
        <div className="col-span-1 flex items-center">
          <div className="p-12 bifrost__transparent_card rounded-lg flex flex-col items-start space-y-6 w-[35vw]">
            <div className="bg-clip-text bifrost__gradient_green text-transparent uppercase lg:text-head-6 text-head-6">
              {data.subHeadline}
            </div>
            <div className="lg:text-head-4 text-head-4 font-[275]">{data.headline}</div>
            <div className="lg:text-body-1 text-body-1 font-[300] opacity-70">{data.body}</div>

            <div className="flex">
              <Button>
                <a href={data.ctaButton.href}>{data.ctaButton.title}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
