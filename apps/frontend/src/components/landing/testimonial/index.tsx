import { GradientBorder } from 'components/ui/gradient-border'
import { Title } from 'components/ui/title'
import { ITestimonial } from 'lib/@types/landing-types'
import { useLayoutEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Description } from 'components/ui/description'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'
import { QuotationIcon1, QuotationIcon2 } from './quotation-icons'
import { Autoplay, Keyboard, Mousewheel } from 'swiper'
import 'swiper/css/autoplay'
import 'swiper/css/keyboard'
import 'swiper/css'
import { useIntersection } from 'lib/hooks'

interface TestimonialProps {
  type: string
  testimonials: ITestimonial[]
  title: string
}

export const Testimonials: React.FC<TestimonialProps> = ({ testimonials, title }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const isIntersecting = useIntersection(sectionRef, { threshold: 0.35 })?.isIntersecting ?? false

  return (
    <GradientBorder innerClass="py-16" className="lg:my-32 my-20" ref={sectionRef}>
      <section className="relative z-10 container mx-auto">
        <Title animate={{ show: isIntersecting }} className="text-center">
          {title}
        </Title>

        <div className="lg:my-20 sm:my-12 my-10">
          <Swiper
            modules={[Autoplay, Mousewheel, Keyboard]}
            autoplay
            speed={700}
            grabCursor
            slidesPerView={1}
            spaceBetween={30}
            loop
            keyboard
            loopedSlides={testimonials.length}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial._key}>
                <Testimonial {...testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </GradientBorder>
  )
}

const Testimonial: React.FC<ITestimonial> = ({ image, name, quote, role }) => {
  const blockquoteRef = useRef<HTMLElement>(null)
  const [blockquoteElemHeight, setBlockquoteElemHeight] = useState(0)

  useLayoutEffect(() => {
    const height = blockquoteRef?.current.getBoundingClientRect().height ?? 0
    setBlockquoteElemHeight(height)
  }, [blockquoteRef])

  return (
    <section className="flex lg:space-x-10 sm:space-x-5 space-x-2">
      <span
        className="md:block hidden"
        style={{ transform: `translate(0, ${blockquoteElemHeight / 2}px)` }}
      >
        <QuotationIcon1 />
      </span>
      <div className="flex-1">
        <blockquote
          ref={blockquoteRef}
          className="xl:text-[24px] lg:text-2xl sm:text-xl text-base font-light"
        >
          “{quote}”
        </blockquote>
        <div className="flex mt-10">
          <figure className="flex-1">
            <SanityImg width={100} builder={imageUrlBuilder} image={image} alt={image?.alt} />
          </figure>
          <div className="flex items-end justify-center flex-col space-y-1 font-light">
            <span className="xl:text-[26px] sm:text-xl text-base">{name}</span>
            <span className="xl:text-[19px] sm:text-lg text-sm">{role}</span>
          </div>
        </div>
      </div>
      <span
        className="md:block hidden"
        style={{ transform: `translate(0, ${blockquoteElemHeight / 2}px)` }}
      >
        <QuotationIcon2 />
      </span>
    </section>
  )
}
