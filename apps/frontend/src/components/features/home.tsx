// import { GradientTitle } from 'src/components/common/GradientTitle'
import { BackgroundNoise } from "components/ui/background-noise";
import { HomeSection } from "lib/@types/use-case-types";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useVisibleScroll, useWindowSize } from "src/lib/hooks";
import { PortableText } from "utils/sanity";
import { WaveScene } from "components/common/wave-scene";
import { Button } from "components/ui/button";
import { OnScrollBackdropEffect } from "components/ui/on-scroll-backdrop-effect";

interface IHomeSection extends HomeSection {
  setHeroSectionHeight: Dispatch<SetStateAction<number>>;
}

const Home: React.FC<IHomeSection> = ({
  ctaButton,
  // heading,
  subtitle,
  title,
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
      className="fixed top-0 left-0 w-full overflow-y-clip bg-black"
      ref={sectionRef}
    >
      <BackgroundNoise />
      <WaveScene play={ratio < 0.7} />
      <OnScrollBackdropEffect ratio={ratio} />

      <div className="| | | | container relative z-10 flex min-h-screen flex-col items-center justify-center overflow-y-clip py-[30%] lg:py-[5%]">
        <div className="| | flex flex-col space-y-5 text-center lg:space-y-12 ">
          {/* <GradientTitle className="mx-auto">{heading}</GradientTitle> */}
          <h1 className="text-center text-head-2-mobile font-primary leading-none lg:text-head-1">
            <PortableText
              blocks={title}
              serializers={{
                marks: {
                  pop: ({ children }: any) => (
                    <span
                      style={{
                        WebkitBoxDecorationBreak: "clone",
                      }}
                      className="primary__gradient bg-clip-text text-transparent"
                    >
                      {children}
                    </span>
                  ),
                },
              }}
            />
          </h1>
          <p className="| | | max-w-3xl text-center text-body-2-mobile font-light opacity-70 lg:text-body-2 ">
            {subtitle}
          </p>
          {!!ctaButton && (
            <div>
              <Button type="href" href={ctaButton.href ?? "/"}>
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

export default Home;
