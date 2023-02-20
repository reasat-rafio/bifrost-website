import { GradientBorder } from "components/ui/gradient-border";
import { Title } from "components/ui/title";
import { ITestimonial } from "lib/@types/landing-types";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Mousewheel, Navigation } from "swiper";
import { Testimonial } from "./testimonial";
import { useIntersection } from "lib/hooks";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/navigation";
import "swiper/css";

interface TestimonialProps {
  type: string;
  testimonials: ITestimonial[];
  title: string;
}

const Testimonials: React.FC<TestimonialProps> = ({ testimonials, title }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  const isIntersecting =
    useIntersection(sectionRef, { threshold: 0.15 })?.isIntersecting ?? false;

  return (
    <GradientBorder
      ref={sectionRef}
      innerClass="px-[18px] py-[33px] lg:py-[67px] lg:px-[101px]"
      className="my-20 lg:my-32"
      maxWidth="max-w-[1230px]"
    >
      <section className=" z-10 grid grid-cols-12 items-center justify-center">
        <button
          aria-label="previous slide"
          ref={(node) => setPrevEl(node)}
          className="col-span-1 mx-auto hidden max-w-[17px] items-center justify-center md:flex"
        >
          <ArrowLeft />
        </button>
        <div className="relative col-span-12 md:col-span-10">
          <Title animate={{ show: isIntersecting }} className="text-center">
            {title}
          </Title>

          <div className="my-10 sm:my-12 lg:my-20">
            <Swiper
              modules={[Autoplay, Mousewheel, Keyboard, Navigation]}
              autoplay
              speed={700}
              grabCursor
              slidesPerView={1}
              spaceBetween={30}
              navigation={{ prevEl, nextEl }}
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
        </div>
        <button
          aria-label="next slide"
          ref={(node) => setNextEl(node)}
          className="col-span-1 mx-auto hidden max-w-[17px] items-center justify-center md:flex"
        >
          <ArrowRight />
        </button>

        {/* Mobile Navigation button  */}
        <div className="col-span-12 flex justify-between md:hidden">
          <button
            aria-label="previous slide"
            ref={(node) => setPrevEl(node)}
            className="col-span-1 flex max-w-[17px] items-center justify-center"
          >
            <ArrowLeft />
          </button>
          <button
            aria-label="next slide"
            ref={(node) => setNextEl(node)}
            className="col-span-1 flex max-w-[17px] items-center justify-center"
          >
            <ArrowRight />
          </button>
        </div>
      </section>
    </GradientBorder>
  );
};

const ArrowLeft = () => {
  return (
    <svg
      width="20"
      height="63"
      viewBox="0 0 20 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 62L2 31.5L19 1" stroke="#70FCEB" strokeWidth="2" />
    </svg>
  );
};

const ArrowRight = () => {
  return (
    <svg
      width="20"
      height="63"
      viewBox="0 0 20 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 0.999999L18 31.5L0.999999 62"
        stroke="#70FCEB"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Testimonials;
