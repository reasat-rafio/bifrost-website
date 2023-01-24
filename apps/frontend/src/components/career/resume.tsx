import { CTAButton } from 'lib/@types/global-types'
import { GradientBorder } from 'components/common/GradientBorder'
import { Button } from 'components/ui/button'
import { PortableText } from 'utils/sanity'
import { motion } from 'framer-motion'

interface ResumeProps {
  headline: any
  ctaButton: CTAButton
}

export const Resume: React.FC<ResumeProps> = ({ headline, ctaButton }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'tween', duration: 0.7, ease: 'easeInOut' }}
      className="container z-10 relative text-center xl:mb-36 lg:mb-20 mb-16"
    >
      <GradientBorder>
        <div className="flex flex-col | md:space-y-8 space-y-4 | md:py-20 py-10 px-5">
          <h4 className="max-w-2xl mx-auto | xl:text-head-3 md:text-head-md text-head-3-mobile | font-primary | leading-none text-center">
            <PortableText
              blocks={headline}
              serializers={{
                marks: {
                  pop: ({ children }: any) => (
                    <span className="text-transparent bg-clip-text primary__gradient">
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
    </motion.section>
  )
}
