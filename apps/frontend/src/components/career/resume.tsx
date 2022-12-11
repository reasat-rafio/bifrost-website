import { CTAButton } from 'lib/@types/types'
import { GradientBorder } from 'components/common/GradientBorder'
import { Button } from 'components/ui/button'
import { PortableText } from 'utils/sanity'

interface ResumeProps {
  headline: any
  ctaButton: CTAButton
}

export const Resume: React.FC<ResumeProps> = ({ headline, ctaButton }) => {
  return (
    <section className="container z-10 relative text-center xl:mb-36 lg:mb-20 mb-16">
      <GradientBorder>
        <div className="flex flex-col | md:space-y-8 space-y-4 | md:py-20 py-10 px-5">
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
          {!!ctaButton && (
            <div className="z-10">
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
