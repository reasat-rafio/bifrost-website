import { Partner } from "lib/@types/landing-types";
import { useIntersection, useWindowSize } from "lib/hooks";
import Link from "next/link";
import { SanityImg } from "sanity-react-extra";
import { Autoplay, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { imageUrlBuilder } from "utils/sanity";
import { motion } from "framer-motion";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/mousewheel";
import { ScaleUpChild, ScaleUpParent } from "animations/scale-up";

interface PartnersProps {
  type: string;
  partners: Partner[];
}

export const Partners: React.FC<PartnersProps> = ({ partners }) => {
  const containerRef = useRef(null);
  const intersection = useIntersection(containerRef, { threshold: 0.15 });
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <motion.section
      ref={containerRef}
      initial="hidden"
      animate={intersection?.isIntersecting ? "visible" : "hidden"}
      variants={ScaleUpParent}
      className="container mx-auto"
    >
      <Swiper
        modules={[Autoplay, Mousewheel]}
        className="border-b border-secondary/80 !py-10"
        centeredSlides
        loop
        grabCursor
        slidesPerView={2}
        spaceBetween={50}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          400: {
            slidesPerView: 3,
            spaceBetween: 60,
          },
          560: {
            slidesPerView: 3,
            spaceBetween: 70,
          },
          800: {
            slidesPerView: 5,
            spaceBetween: 80,
          },

          1280: {
            slidesPerView: 6,
            spaceBetween: 90,
          },
          1536: {
            slidesPerView: 6,
            spaceBetween: 100,
          },
        }}
        loopedSlides={partners.length}
        mousewheel={{ forceToAxis: true }}
        autoplay
        speed={windowWidth * 10}
      >
        {partners.map(({ _key, name, url, logo }) => (
          <SwiperSlide className="my-auto" key={_key}>
            <motion.div variants={ScaleUpChild}>
              {!!url ? (
                <Link href={url}>
                  <a title={name ?? null}>
                    <SanityImg
                      className="max-h-[80px] object-contain"
                      builder={imageUrlBuilder}
                      image={logo}
                      width={windowWidth >= 640 ? 200 : 100}
                      alt={logo.alt}
                    />
                  </a>
                </Link>
              ) : (
                <SanityImg
                  className="max-h-[80px] object-contain"
                  builder={imageUrlBuilder}
                  image={logo}
                  width={windowWidth >= 640 ? 200 : 100}
                  alt={logo.alt}
                />
              )}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
};
