import { GradientBorder } from "components/ui/gradient-border";
import { Title } from "components/ui/title";
import { ITestimonial } from "lib/@types/landing-types";
import { useLayoutEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "utils/sanity";
import { QuotationIcon1, QuotationIcon2 } from "./quotation-icons";
import { Autoplay, Keyboard, Mousewheel } from "swiper";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css";
import { useIntersection, useWindowSize } from "lib/hooks";
import { truncate } from "lib/helpers";

interface TestimonialProps {
  type: string;
  testimonials: ITestimonial[];
  title: string;
}

export const Testimonials: React.FC<TestimonialProps> = ({
  testimonials,
  title,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isIntersecting =
    useIntersection(sectionRef, { threshold: 0.3 })?.isIntersecting ?? false;

  return (
    <GradientBorder
      innerClass="py-16"
      className="my-20 lg:my-32"
      ref={sectionRef}
    >
      <section className="container relative z-10 mx-auto">
        <Title animate={{ show: isIntersecting }} className="text-center">
          {title}
        </Title>

        <div className="my-10 sm:my-12 lg:my-20">
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
  );
};

const Testimonial: React.FC<ITestimonial> = ({
  image,
  name,
  testimony,
  role,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const blockquoteRef = useRef<HTMLElement>(null);
  const [blockquoteElemHeight, setBlockquoteElemHeight] = useState(0);

  useLayoutEffect(() => {
    const height = blockquoteRef?.current.getBoundingClientRect().height ?? 0;
    setBlockquoteElemHeight(height);
  }, [blockquoteRef]);

  return (
    <section className="flex space-x-2 sm:space-x-5 lg:space-x-10">
      <span
        className="hidden md:block"
        style={{ transform: `translate(0, ${blockquoteElemHeight / 2}px)` }}
      >
        <QuotationIcon1 />
      </span>
      <div className="flex-1">
        <blockquote
          ref={blockquoteRef}
          className="text-base font-light sm:text-xl lg:text-2xl xl:text-p-2"
        >
          “{truncate(testimony, 300)}”
        </blockquote>
        <div className="mt-10 flex">
          <figure className="flex-1">
            <SanityImg
              className="max-h-[100px] object-contain"
              width={windowWidth >= 640 ? 100 : 80}
              builder={imageUrlBuilder}
              image={image}
              alt={image?.alt}
            />
          </figure>
          <div className="flex flex-col items-end justify-center space-y-1 font-light">
            <span className="text-base sm:text-xl xl:text-[26px]">{name}</span>
            <span className="text-sm sm:text-lg xl:text-[19px]">{role}</span>
          </div>
        </div>
      </div>
      <span
        className="hidden md:block"
        style={{ transform: `translate(0, ${blockquoteElemHeight / 2}px)` }}
      >
        <QuotationIcon2 />
      </span>
    </section>
  );
};
