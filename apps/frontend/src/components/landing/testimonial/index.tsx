import { GradientBorder } from 'components/ui/gradient-border'
import { Title } from 'components/ui/title'
import { ITestimonial } from 'lib/@types/landing-types'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Description } from 'components/ui/description'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

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

        <div className="my-20">
          <Swiper slidesPerView={1} spaceBetween={30}>
            {testimonials.map(({ _key, image, name, quote, role }) => (
              <SwiperSlide key={_key}>
                <section>
                  <blockquote className="text-[24px] font-light">“{quote}”</blockquote>
                  <div className="flex mt-10">
                    <figure className="flex-1">
                      <SanityImg
                        width={100}
                        builder={imageUrlBuilder}
                        image={image}
                        alt={image?.alt}
                      />
                    </figure>
                    <div className="flex flex-col space-y-3 font-light">
                      <span className="text-[26px]">{name}</span>
                      <Description>{role}</Description>
                    </div>
                  </div>
                </section>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </GradientBorder>
  )
}
