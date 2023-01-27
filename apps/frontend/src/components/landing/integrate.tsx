import { Button } from 'components/ui/button'
import { Heading } from 'components/ui/heading'
import { Title } from 'components/ui/title'
import { CTAButton } from 'lib/@types/global-types'

interface IntegrateProps {
  type: string
  ctaButton: CTAButton
  showWave: boolean
  subtitle: string
  title: string
}

export const Integrate: React.FC<IntegrateProps> = ({ ctaButton, title, subtitle }) => {
  return (
    <section className="relative z-10 | container mx-auto lg:py-32 py-20">
      <div className="flex flex-col justify-center | space-y-8 lg:px-[4%] | font-light">
        <Title className="text-center">{title}</Title>
        <Heading className="text-center">{subtitle}</Heading>
        <div className="text-center !mt-12">
          <Button type="href" variant="secondary" href={ctaButton.href}>
            {ctaButton.title}
          </Button>
        </div>
      </div>
    </section>
  )
}
