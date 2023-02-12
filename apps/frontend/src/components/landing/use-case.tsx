import { Description } from "components/ui/description";
import { Heading } from "components/ui/heading";
import { Title } from "components/ui/title";
import { IUseCase } from "lib/@types/landing-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "utils/sanity";
import Link from "next/link";
import { Section } from "components/ui/section";
import { Autoplay, FreeMode, Keyboard, Mousewheel } from "swiper";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css";

interface UseCaseProps {
  type: string;
  description: string;
  heading: string;
  title: string;
  useCases: IUseCase[];
}

export const UseCase: React.FC<UseCaseProps> = ({
  title,
  heading,
  description,
  useCases,
}) => {
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
          {useCases.map(({ _key, image, name, url }) => (
            <SwiperSlide key={_key} className="relative !h-[300px] !w-auto">
              {!!url ? (
                <Link href={url}>
                  <a>
                    <SanityImg
                      className="rounded-primary object-cover"
                      height={300}
                      builder={imageUrlBuilder}
                      image={image}
                      alt={image.alt}
                    />
                  </a>
                </Link>
              ) : (
                <SanityImg
                  className="rounded-primary object-cover"
                  height={300}
                  builder={imageUrlBuilder}
                  image={image}
                  alt={image.alt}
                />
              )}
              <p className="absolute bottom-10 left-1/2 -translate-x-1/2 drop-shadow">
                {name}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  );
};
