import { GradientBorder } from 'components/ui/gradient-border'
import { Title } from 'components/ui/title'
import { ITestimonial } from 'lib/@types/landing-types'
import { useRef } from 'react'

interface TestimonialProps {
  type: string
  testimonials: ITestimonial[]
  title: string
}

export const Testimonial: React.FC<TestimonialProps> = ({ testimonials, title }) => {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <GradientBorder innerClass="py-16" className="lg:my-32 my-20" ref={sectionRef}>
      <section className="relative z-10 container mx-auto">
        <Title className="text-center">{title}</Title>

        <div>{/* <Sw */}</div>
      </section>
    </GradientBorder>
  )
}
