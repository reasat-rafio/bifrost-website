import clsx from 'clsx'
import SlideUp from 'components/SlideUpText'
import Button from 'components/ui/Button'
import { ContactSection } from 'lib/landingTypes'
import { ReactElement, useRef } from 'react'

export default function HomeContact(data: ContactSection): ReactElement {
  const headingRef = useRef<HTMLDivElement>(null)
  return (
    <div
      className={clsx(
        'container flex flex-col justify-center space-y-4 lg:space-y-0 z-10 relative gap-x-5 xl:my-32 lg:my-16 my-14',
        'text-white',
      )}
    >
      <div className="lg:text-head-2 text-[40px] leading-[40px] font-[275] xl:w-[50%] md:w-[60%] sm:w-[70%]">
        <SlideUp divRef={headingRef} text={data.headline} />
      </div>
      <div className="self-end lg:w-[70%] w-full flex flex-col space-y-5">
        <input
          className="shadow w-full input__dark border border-[#8E8E8E] rounded-lg appearance-none lg:py-6 py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Name"
        />
        <input
          className="shadow w-full input__dark border border-[#8E8E8E] rounded-lg appearance-none lg:py-6 py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
        />
        <textarea
          className="shadow w-full input__dark border border-[#8E8E8E] rounded-lg appearance-none lg:py-6 py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="message"
          placeholder="Message"
          rows={4}
        />

        <div className="flex">
          <Button color="secondary">
            <a href={data.ctaButton.href}>{data.ctaButton.title}</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
