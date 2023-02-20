import { Partner } from "lib/@types/landing-types";
import { useWindowSize } from "lib/hooks";
import Link from "next/link";
import { SanityImg } from "sanity-react-extra";
import { Autoplay, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { imageUrlBuilder } from "utils/sanity";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/mousewheel";

interface PartnersProps {
  type: string;
  partners: Partner[];
}

const Partners: React.FC<PartnersProps> = ({ partners }) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <section className="container mx-auto">
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
            <div>
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Partners;
