import { Description } from "components/ui/description";
import { Heading } from "components/ui/heading";
import { Title } from "components/ui/title";
import { AssetElement } from "lib/@types/landing-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "utils/sanity";
import { Video } from "./video";
import { Section } from "components/ui/section";
import { useWindowSize } from "lib/hooks";
import { Autoplay, FreeMode, Keyboard, Mousewheel } from "swiper";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css";

interface OutputsProps {
  type: string;
  assets: AssetElement[];
  description: string;
  heading: string;
  title: string;
}

export const Outputs: React.FC<OutputsProps> = ({
  assets,
  title,
  heading,
  description,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <Section>
      <div className="spacing_primary | font-light">
        <Title>{title}</Title>
        <Heading>{heading}</Heading>
        <Description>{description}</Description>
      </div>

      <div className="mt-10">
        <Swiper
          modules={[Autoplay, Mousewheel, Keyboard, FreeMode]}
          grabCursor
          keyboard
          autoplay
          freeMode
          slidesPerView={"auto"}
          spaceBetween={30}
        >
          {assets.map(({ _key, alt, mp4, asset, webm }) => (
            <SwiperSlide
              key={_key}
              className="!h-[200px] !w-fit sm:!h-[250px] lg:!h-[300px]"
            >
              {!!asset ? (
                <SanityImg
                  className="h-full w-full rounded-primary object-cover"
                  height={
                    windowWidth >= 1024 ? 300 : windowWidth >= 640 ? 250 : 220
                  }
                  builder={imageUrlBuilder}
                  image={asset}
                  alt={alt}
                />
              ) : (
                <Video mp4={mp4} webm={webm} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  );
};
