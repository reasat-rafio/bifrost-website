import { WaveScene } from "components/common/wave-scene";
import { useVisibleScroll, useWindowSize } from "src/lib/hooks";
import { useRef } from "react";
import { BackgroundNoise } from "components/ui/background-noise";
import { HomeProps } from "lib/@types/about-us-types";
import { PortableText } from "utils/sanity";
import { Description } from "components/ui/description";
import { Button } from "components/ui/button";

const Hero: React.FC<HomeProps> = ({ ctaButton, description, title }) => {
  const { height: windowHeight } = useWindowSize() ?? {
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

  return (
    <section
      className="relative w-full overflow-y-clip bg-midnight-blue"
      ref={sectionRef}
    >
      <BackgroundNoise />
      <WaveScene className="translate-y-[35vh]" play={ratio < 0.7} />

      <div className="container relative z-10 flex min-h-[60vh] flex-col justify-center overflow-y-clip py-[30%] md:min-h-[60vh] lg:py-[5%]">
        <div className="flex flex-col space-y-5 lg:space-y-10">
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
          {!!description && (
            <Description className="max-w-3xl">{description}</Description>
          )}
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
