import clsx from "clsx";
import React, { useRef, Dispatch, SetStateAction, useEffect } from "react";
import { HomeSection } from "lib/@types/landing-types";
import { imageUrlBuilder, PortableText } from "utils/sanity";
import { SanityImg } from "sanity-react-extra";
import { useVisibleScroll, useWindowSize } from "src/lib/hooks";
import { BackgroundNoise } from "components/ui/background-noise";
import { Button } from "components/ui/button";
import { WaveScene } from "components/common/wave-scene";
import { OnScrollBackdropEffect } from "components/ui/on-scroll-backdrop-effect";

interface IHomeSection extends HomeSection {
  setHeroSectionHeight: Dispatch<SetStateAction<number>>;
}

const Hero: React.FC<IHomeSection> = ({
  title,
  subtitle,
  ctaButton,
  image,
  setHeroSectionHeight,
}) => {
  const { height: windowHeight, width: windowWidth } = useWindowSize() ?? {
    height: 0,
    width: 0,
  };
  const sectionRef = useRef<HTMLElement>(null);
  const visibleScroll = useVisibleScroll(sectionRef);
  const ratio = visibleScroll
    ? Math.min(
        1,
        Math.max(
          0,
          (visibleScroll.y - visibleScroll.offsetBoundingRect.top) /
            windowHeight
        )
      )
    : 0;

  useEffect(() => {
    if (sectionRef?.current)
      setHeroSectionHeight(sectionRef.current.clientHeight);
  }, [windowWidth, sectionRef]);

  return (
    <section
      ref={sectionRef}
      className={clsx("fixed top-0 left-0 w-full overflow-y-clip bg-black")}
    >
      <BackgroundNoise />
      <WaveScene play={ratio < 0.7} />
      <OnScrollBackdropEffect ratio={ratio} />

      <div className="container relative z-10 flex h-screen w-screen flex-col overflow-y-clip pt-24 lg:flex-row lg:pt-16">
        <section className="flex flex-1 flex-col justify-center space-y-5 sm:space-y-10">
          <h1 className="text-head-3 font-light leading-none sm:text-head-4 md:text-head-2 lg:text-head-1">
            <PortableText
              blocks={title}
              serializers={{
                marks: {
                  pop: ({ children }: any) => (
                    <span className="primary__gradient bg-clip-text text-transparent">
                      {children}
                    </span>
                  ),
                },
              }}
            />
          </h1>
          <h4 className="max-w-2xl overflow-hidden text-xl font-light leading-[32px] text-white sm:text-2xl lg:text-p-2">
            {subtitle}
          </h4>
          {!!ctaButton && (
            <Button variant="secondary" type="href" href={ctaButton.href}>
              {ctaButton.title}
            </Button>
          )}
        </section>
        <figure className="flex lg:items-end">
          <SanityImg
            className="mx-auto drop-shadow sm:w-[50vh]"
            builder={imageUrlBuilder}
            width={windowWidth >= 1024 ? 600 : windowWidth >= 640 ? 350 : 250}
            image={image}
            alt={image.alt}
          />
        </figure>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-[30vh] w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)",
        }}
      />
    </section>
  );
};

export default Hero;
