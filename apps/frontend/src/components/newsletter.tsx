import { PortableText } from 'src/utils/sanity'
import { GradientBorder } from './common/GradientBorder'
import { CTAButton } from 'lib/@types/types'
import { Button } from './ui/button'

interface NewsletterProps {
  headline: any
  ctaButton: CTAButton
  body: string
}

const Newsletter: React.FC<NewsletterProps> = ({ headline, ctaButton, body }) => {
  return (
    <section className="container z-10 relative text-center xl:mb-36 lg:mb-20 mb-16">
      <GradientBorder>
        <div className="flex flex-col md:space-y-8 space-y-4 | md:py-20 py-10 px-5">
          <h4 className="max-w-2xl mx-auto | xl:text-head-3 md:text-head-md text-head-3-mobile | font-primary | leading-none text-center">
            <PortableText
              blocks={headline}
              serializers={{
                marks: {
                  pop: ({ children }: any) => (
                    <span className="text-transparent bg-clip-text gradient__white__to__green">
                      {children}
                    </span>
                  ),
                },
              }}
            />
          </h4>
          <p className="md:text-body-2 text-sm font-light | max-w-lg mx-auto | leading-snug">
            {body}
          </p>
          {!!ctaButton && (
            <div className="max-w-lg mx-auto w-full relative flex">
              <input
                autoComplete="off"
                className="w-full | md:py-6 py-4 px-5 | text-body-3 text-gray-700 leading-tight | rounded-[15px] | appearance-none focus:outline-none focus:shadow-outline shadow | input__dark "
                id="username"
                type="email"
                placeholder="Enter your email address"
              />

              <div className="hidden md:block | z-10 absolute right-3 top-1/2 -translate-y-1/2">
                <Button variant="primary" type="href" href={ctaButton?.href ?? ''}>
                  {ctaButton.title}
                </Button>
              </div>
            </div>
          )}
          {!!ctaButton && (
            <div className="block md:hidden">
              <Button variant="primary" type="href" href={ctaButton?.href ?? ''}>
                {ctaButton.title}
              </Button>
            </div>
          )}
        </div>
      </GradientBorder>
    </section>
  )
}

export default Newsletter