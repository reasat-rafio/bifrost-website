import { WaveScene } from "components/common/wave-scene";
import { useVisibleScroll, useWindowSize } from "src/lib/hooks";
import { useLayoutEffect, useRef, useState } from "react";
import { BackgroundNoise } from "components/ui/background-noise";
import { PortableText } from "utils/sanity";
import { Description } from "components/ui/description";
import { Form } from "./form";

interface IHomeSection {
  title: any[];
  subtitle: any[];
}

const Hero: React.FC<IHomeSection> = ({ subtitle, title }) => {
  const { width: windowWidth, height: windowHeight } = useWindowSize() ?? {
    height: 0,
    width: 0,
  };
  const sectionRef = useRef<HTMLElement>(null);
  const visibleScroll = useVisibleScroll(sectionRef);
  const [navbarHeight, setNavbarHeight] = useState(0);
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

  useLayoutEffect(() => {
    const height = document.querySelector("#navbar")?.clientHeight ?? 0;
    setNavbarHeight(height);
  }, [windowWidth]);

  return (
    <section className="relative w-full !overflow-hidden" ref={sectionRef}>
      <BackgroundNoise />
      <WaveScene play={ratio < 0.7} />

      <div
        style={{
          marginTop: navbarHeight,
          minHeight: `calc(100vh - ${navbarHeight}px)`,
        }}
        className="container relative z-10 flex items-center justify-center overflow-y-clip py-[20%] lg:space-x-5 lg:py-[5%]"
      >
        <div className="flex flex-1 flex-col space-y-5 lg:space-y-10">
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
          <Description
            type="div"
            className="prose-sm max-w-none prose-ul:m-0 prose-ul:p-0"
          >
            <PortableText
              blocks={subtitle}
              serializers={{
                listItem: ({ children }: any) => {
                  return (
                    <span className="mb-5 flex items-center space-x-3 text-p-3-mobile leading-[25px] !tracking-[0.02em] sm:text-xl md:!leading-[30px] lg:text-p-3">
                      <span
                        style={{
                          transform: `matrix(0.69, 0.72, -0.69, 0.72, 0, 0)`,
                        }}
                        className="h-3 w-3 rounded-[4px] bg-[#B794FF] sm:h-[15.18px] sm:w-[15.18px]"
                      />
                      <span>{children}</span>
                    </span>
                  );
                },
              }}
            />
          </Description>
        </div>
        <Form className="hidden flex-1 lg:block" />
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
