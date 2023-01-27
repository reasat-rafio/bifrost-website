import { WaveScene } from 'components/common/wave-scene'
import { Button } from 'components/ui/button'
import { Heading } from 'components/ui/heading'
import { Title } from 'components/ui/title'
import { CTAButton } from 'lib/@types/global-types'
import { useIntersection } from 'lib/hooks'
import { useRef } from 'react'

interface PredictionProps {
  type: string
  ctaButton: CTAButton
  showWave: boolean
  subtitle: string
  title: string
}

export const Prediction: React.FC<PredictionProps> = ({ ctaButton, showWave, subtitle, title }) => {
  const sectionRef = useRef(null)
  const intersecting = useIntersection(sectionRef, { threshold: 0.25 })?.isIntersecting ?? false

  return (
    <section ref={sectionRef} className="relative z-20 | lg:py-32 py-20 overflow-clip">
      {!!showWave && <WaveScene play={intersecting} />}
      <div className="z-20 relative container mx-auto space-y-6">
        <div className="flex flex-col justify-center | space-y-8 lg:px-[4%] | font-light"></div>
        <Title className="text-center">{title}</Title>
        <Heading className="text-center">{subtitle}</Heading>
        <div className="text-center !mt-12">
          <Button type="href" variant="secondary" href={ctaButton.href}>
            {ctaButton.title}
          </Button>
        </div>
      </div>

      {!!showWave && (
        <div
          className="z-10 pointer-events-none absolute bottom-0 left-0 h-[30vh] w-full"
          style={{ background: 'linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)' }}
        />
      )}
    </section>
  )
}
