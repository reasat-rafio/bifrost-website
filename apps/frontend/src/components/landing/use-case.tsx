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

const UseCase: React.FC<UseCaseProps> = ({
  title,
  heading,
  description,
  useCases,
}) => {
  return (
    <Section>
      <div className="spacing_primary font-light">
        <Title>{title}</Title>
        <Heading>{heading}</Heading>
        <Description>{description}</Description>
      </div>

      <div className="mt-10">
        <Swiper
          className="!p-1"
          modules={[Autoplay, Mousewheel, Keyboard, FreeMode]}
          grabCursor
          keyboard
          autoplay
          freeMode
          slidesPerView={"auto"}
          spaceBetween={30}
        >
          {useCases.map((usecase) => (
            <SwiperSlide
              key={usecase._key}
              className="group relative !h-[300px] !w-auto rounded-[10px]"
            >
              {!!usecase?.url ? (
                <Link href={usecase.url}>
                  <a>
                    <UseCaseItem {...usecase} />
                  </a>
                </Link>
              ) : (
                <UseCaseItem {...usecase} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  );
};

const UseCaseItem: React.FC<IUseCase> = ({ image, name, url }) => {
  return (
    <>
      <div className="absolute inset-0 rounded-[10px] opacity-0 outline-double outline-2 outline-teal transition-all duration-300 group-hover:opacity-100" />
      <SanityImg
        className="rounded-[10px] object-cover"
        height={300}
        builder={imageUrlBuilder}
        image={image}
        alt={image.alt}
      />
      <div
        style={{
          background:
            "linear-gradient(0deg, #29394A 12.21%, rgba(0, 0, 0, 0) 37.46%)",
          backgroundBlendMode: "multiply, normal",
        }}
        className="absolute inset-0 flex h-full w-full items-end justify-center rounded-[10px]"
      >
        <p className="mb-[16px] p-2 text-[18px] leading-[120%] text-[#FCF9FF] drop-shadow">
          {name}
        </p>
      </div>
    </>
  );
};

export default UseCase;
