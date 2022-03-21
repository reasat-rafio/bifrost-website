import Button from 'components/ui/Button'
import { DataSection } from 'lib/@types/landingTypes'
import { ReactElement } from 'react'
import { PortableText } from 'utils/sanity'
import { GradientBorder } from './common/GradientBorder'

export default function Data(data: DataSection): ReactElement {
  return (
    <div className="container z-10 relative text-center xl:my-36 lg:my-20 my-16  ">
      <GradientBorder>
        <div className="md:py-20 py-10 px-5 flex flex-col rounded-[15px] xl:space-y-12 space-y-6">
          <h3 className="md:text-[62px] text-[38px] leading-none font-[275]">
            <PortableText
              blocks={data.headline}
              serializers={{
                marks: {
                  pop: ({ children }: any) => (
                    <span className="text-transparent bg-clip-text bifrost__gradient__green">
                      {children}
                    </span>
                  ),
                },
              }}
            />
          </h3>
          <p className="md:text-body-2 text-[14px] font-[300] max-w-2xl mx-auto">{data.body}</p>
          <div className="relative xl:space-y-0 space-y-6 w-full max-w-2xl mx-auto">
            <input
              className="shadow w-full input__dark rounded-lg appearance-none py-6 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="email"
              placeholder="Enter your email address"
            />
            <div className="xl:absolute xl:top-[15%] right-2 xl:block flex justify-center items-center">
              <div>
                <Button>
                  <a href={data.ctaButton.href}>{data.ctaButton.title}</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </GradientBorder>
    </div>
  )
}
