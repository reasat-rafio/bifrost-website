import clsx from 'clsx'
import Button from 'components/ui/Button'
import { DataSection } from 'lib/types'
import { ReactElement } from 'react'

export default function HomeData(data: DataSection): ReactElement {
  console.log({ data })

  return (
    <div
      className={clsx(
        'container flex justify-center items-center z-10 relative h-[100vh] text-center',
        'text-white',
      )}
    >
      <div className="bifrost__transparent_card w-full md:py-20 py-10 px-5 flex flex-col gap-y-6">
        <div className="md:text-head-3 text-[22px] leading-[22px] font-[275]">{data.headline}</div>
        <div className="md:text-body-2 text-[14px] leading-[16px] font-[300]">{data.body}</div>
        <div className="flex items-center justify-center">
          <div className="relative md:w-2/5 w-full md:space-y-0 space-y-5">
            <input
              className="shadow w-full input__dark rounded-lg appearance-none py-6 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="email"
              placeholder="Enter your email address"
            />
            <div className="xl:absolute xl:top-[15%] right-2">
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
