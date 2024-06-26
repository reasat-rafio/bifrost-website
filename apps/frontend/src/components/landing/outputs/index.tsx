import dynamic from "next/dynamic";
import { Description } from "components/ui/description";
import { Heading } from "components/ui/heading";
import { Section } from "components/ui/section";
import { Title } from "components/ui/title";
import { AssetElement } from "lib/@types/landing-types";
import { useWindowSize } from "lib/hooks";
import { useState } from "react";
import { SanityImg } from "sanity-react-extra";
import { Autoplay, FreeMode, Keyboard, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "swiper/css/keyboard";
import { Swiper, SwiperSlide } from "swiper/react";
import { imageUrlBuilder } from "utils/sanity";
import { VideoThumbnail } from "./video-thumbnail";
import type { PopupProps } from "./popup";
const Popup = dynamic<PopupProps>(() => import("./popup"), {
  ssr: false,
});

interface OutputsProps {
  type: string;
  assets: AssetElement[];
  description: string;
  heading: string;
  title: string;
}

const Outputs: React.FC<OutputsProps> = ({
  assets,
  title,
  heading,
  description,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const [selectedVideo, setSelectedVideo] = useState<AssetElement | null>(null);

  return (
    <Section>
      <div className="spacing_primary | font-light">
        <Title>{title}</Title>
        <Heading>{heading}</Heading>
        <Description>{description}</Description>
      </div>

      <div className="relative z-10 mt-10">
        <Swiper
          modules={[Autoplay, Mousewheel, Keyboard, FreeMode]}
          grabCursor
          keyboard
          observer
          observeParents
          autoplay
          freeMode
          slidesPerView={"auto"}
          spaceBetween={30}
        >
          {assets.map((asset) => (
            <SwiperSlide
              key={asset._key}
              className="!h-[200px] !w-fit sm:!h-[250px] lg:!h-[300px]"
            >
              {asset._type === "image" ? (
                <SanityImg
                  className="h-full w-full rounded-primary object-cover"
                  height={
                    windowWidth >= 1024 ? 300 : windowWidth >= 640 ? 250 : 220
                  }
                  builder={imageUrlBuilder}
                  image={asset}
                  alt={asset.alt}
                />
              ) : (
                <VideoThumbnail
                  asset={asset}
                  setSelectedVideo={setSelectedVideo}
                  windowWidth={windowWidth}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Popup asset={selectedVideo} setSelectedVideo={setSelectedVideo} />
    </Section>
  );
};

export default Outputs;
