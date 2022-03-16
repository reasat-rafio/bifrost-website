import Button from 'components/ui/Button'
import { AssuranceSection } from 'lib/useCaseTypes'
import { ReactElement } from 'react'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

export default function UseCaseAssurance(data: AssuranceSection): ReactElement {
  console.log({ data })
  const { width: windowWidth } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  return (
    <div className="relative my-36">
      <div className="container lg:py-16 py-10 z-10 relative text-white grid grid-cols-12 gap-8">
        <div className="col-span-12">
          <SanityImg
            className="w-full h-full rounded-xl md:object-contain object-cover"
            builder={imageUrlBuilder}
            image={data.image}
            alt={data.image?.alt || 'image'}
            height={windowWidth >= 768 ? 1000 : 500}
          />
        </div>
        <div className="absolute bottom-0 col-start-6 col-end-12 bifrost__transparent_card translate-y-[7rem] flex flex-col justify-center p-14 space-y-6">
          <div className="bg-clip-text bifrost__gradient__green text-transparent uppercase lg:text-head-6 text-head-6">
            {data.subHeadline}
          </div>
          <div className="lg:text-head-4 text-[35px] lead-[35px] font-[275]">{data.headline}</div>
          <div className="lg:text-body-1 text-[14px] lead-[26px] font-[300] opacity-70">
            {data.body}
          </div>
          <Button className="flex items-start" color="secondary">
            <a href={data.ctaButton.href}>{data.ctaButton.title}</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
