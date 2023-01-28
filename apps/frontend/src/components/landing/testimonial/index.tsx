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

interface TestimonialProps {
  type: string
  testimonials: ITestimonial[]
  title: string
}

export const Testimonials: React.FC<TestimonialProps> = ({ testimonials, title }) => {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <GradientBorder innerClass="py-16" className="lg:my-32 my-20" ref={sectionRef}>
      <section className="relative z-10 container mx-auto">
        <Title className="text-center">{title}</Title>

        <div className="my-20">
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
    <section className="flex space-x-10 ">
      <span style={{ transform: `translate(0, ${blockquoteElemHeight / 2}px)` }}>
        <QuotationIcon1 />
      </span>
      <div className="flex-1">
        <blockquote ref={blockquoteRef} className="text-[24px] font-light">
          “{quote}”
        </blockquote>
        <div className="flex mt-10">
          <figure className="flex-1">
            <SanityImg width={100} builder={imageUrlBuilder} image={image} alt={image?.alt} />
          </figure>
          <div className="flex flex-col space-y-3 font-light">
            <span className="text-[26px]">{name}</span>
            <Description>{role}</Description>
          </div>
        </div>
      </div>
      <span style={{ transform: `translate(0, ${blockquoteElemHeight / 2}px)` }}>
        <QuotationIcon2 />
      </span>
    </section>
  )
}
