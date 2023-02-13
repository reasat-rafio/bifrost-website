import { WaveScene } from "components/common/wave-scene";
import { useVisibleScroll, useWindowSize } from "src/lib/hooks";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { BackgroundNoise } from "components/ui/background-noise";
import { OnScrollBackdropEffect } from "components/ui/on-scroll-backdrop-effect";
import { HomeProps } from "lib/@types/about-us-types";
import { PortableText } from "utils/sanity";
import { Description } from "components/ui/description";
import { Button } from "components/ui/button";

interface IHomeSection extends HomeProps {
  setHeroSectionHeight: Dispatch<SetStateAction<number>>;
}
const Hero: React.FC<IHomeSection> = ({
  ctaButton,
  description,
  title,
  setHeroSectionHeight,
}) => {
  const { width: windowWidth, height: windowHeight } = useWindowSize() ?? {
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
      className="fixed top-0 left-0 w-full overflow-y-clip bg-black"
      ref={sectionRef}
    >
      <BackgroundNoise />
      <WaveScene play={ratio < 0.7} />
      <OnScrollBackdropEffect ratio={ratio} />

      <div className="container relative z-10 flex min-h-screen flex-col justify-center overflow-y-clip py-[30%] lg:py-[5%]">
        <div className="flex flex-col space-y-5 lg:space-y-10 ">
          <h1 className="text-head-2-mobile font-light leading-none lg:text-head-1">
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
          <Description className="max-w-3xl">{description}</Description>
          {!!ctaButton && (
            <div className="pt-2 md:pt-4">
              <Button
                variant="secondary"
                type="href"
                href={ctaButton.href ?? "/"}
              >
                {ctaButton.title}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[30vh] w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)",
        }}
      />
    </section>
  );
};

export default Hero;
