import { PortableText } from 'src/utils/sanity'
import { GradientBorder } from './GradientBorder'
import { CTAButton } from 'lib/@types/types'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'

interface NewsletterProps {
  title: any
  subtitle?: string
  ctaButton: CTAButton
}

const Newsletter: React.FC<NewsletterProps> = ({ title, ctaButton, subtitle }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-200px' }}
      transition={{ type: 'tween', duration: 0.7, ease: 'easeInOut' }}
      className="container z-10 relative text-center xl:pb-36 lg:pb-20 pb-16"
    >
      <GradientBorder>
        <div className="flex flex-col md:space-y-8 space-y-4 | md:py-20 py-10 px-5">
          <h4 className="max-w-2xl mx-auto | xl:text-head-3 md:text-head-md text-head-3-mobile | font-primary | leading-none text-center">
            <PortableText
              blocks={title}
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
          {!!subtitle && (
            <p className="md:text-body-2 text-sm font-light | max-w-lg mx-auto | leading-snug">
              {subtitle}
            </p>
          )}

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
          <div className="block md:hidden">
            <Button variant="primary" type="href" href={ctaButton?.href ?? ''}>
              {ctaButton.title}
            </Button>
          </div>
        </div>
      </GradientBorder>
    </motion.section>
  )
}

export default Newsletter
