import { WaveScene } from 'components/common/wave-scene'
import { Button } from 'components/ui/button'
import { Description } from 'components/ui/description'
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
  const intersecting = useIntersection(sectionRef, { threshold: 0.3 })?.isIntersecting ?? false

  return (
    <section ref={sectionRef} className="relative z-20 |  overflow-clip section_pading">
      {!!showWave && <WaveScene play={intersecting} />}
      <div className="z-20 relative container mx-auto spacing_primary">
        <Title className="text-center">{title}</Title>
        <Description textBig className="text-center">
          {subtitle}
        </Description>
        <div className="text-center sm:!mt-12 !mt-8">
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
