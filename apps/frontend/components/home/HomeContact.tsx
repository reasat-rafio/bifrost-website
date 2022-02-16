import clsx from 'clsx'
import Button from 'components/ui/Button'
import { ContactSection } from 'lib/types'
import { ReactElement } from 'react'

export default function HomeContact(data: ContactSection): ReactElement {
  return (
    <div
      className={clsx(
        'container flex flex-col justify-center z-10 relative gap-x-5 h-[100vh]',
        'text-white',
      )}
    >
      <div className="text-[80px] leading-[80px] font-[275] w-[50%]">{data.headline}</div>
      <div className="self-end w-[70%] flex flex-col space-y-5">
        <input
          className="shadow w-full input__dark border border-[#8E8E8E] rounded-lg appearance-none py-6 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Name"
        />
        <input
          className="shadow w-full input__dark border border-[#8E8E8E] rounded-lg appearance-none py-6 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
        />
        <textarea
          className="shadow w-full input__dark border border-[#8E8E8E] rounded-lg appearance-none py-6 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="message"
          placeholder="Message"
          rows={4}
        />
        <Button>
          <a href={data.ctaButton.href}>{data.ctaButton.title}</a>
        </Button>
      </div>
    </div>
  )
}
