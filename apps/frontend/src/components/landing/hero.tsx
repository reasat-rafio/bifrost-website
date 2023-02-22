import clsx from "clsx";
import React, {
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useCallback,
} from "react";
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
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gradientSpanRef = useRef<HTMLElement>(null);
  const [fontSize, setFontSize] = useState(92);
  const [lines, setLines] = useState(1);
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

  const collapseWhiteSpace = (value: string) =>
    value.trim().replace(/\s+/g, " ");

  const extractLinesFromTextNode = useCallback((textNode: ChildNode) => {
    if (textNode.nodeType !== 3) {
      throw new Error("Lines can only be extracted from text nodes.");
    }

    textNode.textContent = collapseWhiteSpace(textNode.textContent);
    const textContent = textNode.textContent;
    const range = document.createRange();
    let lines = [];
    let lineCharacters = [];

    for (let i = 0; i < textContent.length; i++) {
      range.setStart(textNode, 0);
      range.setEnd(textNode, i + 1);
      let lineIndex = range.getClientRects().length - 1;
      if (!lines[lineIndex]) {
        lines.push((lineCharacters = []));
      }

      lineCharacters.push(textContent.charAt(i));
    }
    lines = lines.map((characters) => collapseWhiteSpace(characters.join("")));
    return lines;
  }, []);

  useEffect(() => {
    if (gradientSpanRef.current) {
      const source = gradientSpanRef.current.firstChild;
      const lines = extractLinesFromTextNode(source);
      setLines(lines.length);
    }
  }, [gradientSpanRef, windowWidth, setLines, fontSize]);

  useEffect(() => {
    if (sectionRef?.current)
      setHeroSectionHeight(sectionRef.current.clientHeight);
  }, [windowWidth, sectionRef]);

  useEffect(() => {
    let intervalId: number;
    const myLoop = () => {
      if (lines > 1) {
        setFontSize(Math.min(fontSize - 15, 30));
        intervalId = window.setTimeout(myLoop, 1);
      } else {
        setFontSize(Math.min(fontSize + 5, 92));
        intervalId = window.setTimeout(myLoop, 1);
      }
    };
    myLoop();
    return () => window.clearTimeout(intervalId);
  }, [windowWidth, setFontSize, lines]);

  return (
    <section
      ref={sectionRef}
      className={clsx("fixed top-0 left-0 w-full overflow-y-clip bg-black")}
    >
      <BackgroundNoise />
      <WaveScene play={ratio < 0.7} />
      <OnScrollBackdropEffect ratio={ratio} />

      <div className="container relative z-10 flex h-screen w-screen flex-col overflow-y-clip pt-24 lg:flex-row lg:space-x-5 lg:pt-16">
        <section className="flex flex-1 flex-col justify-center space-y-5 sm:space-y-10">
          <h1
            ref={headingRef}
            style={{ fontSize: fontSize }}
            className="font-light leading-none"
          >
            {/* <h1
            className="text-head-md font-light leading-none sm:text-head-4 md:text-head-2 lg:text-head-1"
          > */}
            <PortableText
              blocks={title}
              serializers={{
                marks: {
                  pop: ({ children }: any) => (
                    <span
                      ref={gradientSpanRef}
                      className="primary__gradient bg-clip-text text-transparent"
                    >
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
        <figure className="flex lg:items-center">
          <SanityImg
            loading="eager"
            className="mx-auto drop-shadow sm:w-[40vh]"
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

/* 

 const { height: windowHeight, width: windowWidth } = useWindowSize() ?? {
    height: 0,
    width: 0,
  };
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const gradientSpanRef = useRef<HTMLElement>(null);
  const [fontSize, setFontSize] = useState(92);
  const visibleScroll = useVisibleScroll(sectionRef);
  const [hasLineBreak, setHasLineBreak] = useState(false);
  console.log("====================================");
  console.log({ hasLineBreak });
  console.log("====================================");
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

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1280) {
        setFontSize(92);
      }
      // else if (screenWidth >= 1024) {
      //   setFontSize(80);
      // } else if (screenWidth >= 640) {
      //   setFontSize(62);
      // } else if (screenWidth > 280) {
      //   setFontSize(42);
      // } else {
      //   setFontSize(30);
      // }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function detectLineBreaks(element: HTMLElement) {
    const rects = element.getClientRects();
    let lastBottom = 0;
    let lineBreaks = 0;
    for (let i = 0; i < rects.length; i++) {
      const rect = rects[i];
      if (rect.bottom > lastBottom) {
        lastBottom = rect.bottom;
      } else {
        lineBreaks++;
      }
    }
    return lineBreaks;
  }

  useEffect(() => {
    const header = headerRef?.current;
    if (header) {
      const headerWidth = header.offsetWidth;
      const gradientSpan = gradientSpanRef?.current;
      if (gradientSpan) {
        const gradientSpanWidth = gradientSpan.getBoundingClientRect().width;
        const headerFontSize = parseFloat(
          window.getComputedStyle(header).getPropertyValue("font-size")
        );
        const lineBreaks = detectLineBreaks(gradientSpan);

        if (gradientSpanWidth > headerWidth) {
          let newFontSize = headerFontSize;
          while (gradientSpanWidth > headerWidth && newFontSize > 1) {
            newFontSize -= 1;
            header.style.fontSize = `${newFontSize}px`;
          }
        }
      }
    }
  }, [fontSize, headerRef, gradientSpanRef]);

  useLayoutEffect(() => {
    const handleResize = () => {
      const div = gradientSpanRef.current;
      console.log("====================================");
      console.log(
        gradientSpanRef.current.getBoundingClientRect().width,
        gradientSpanRef.current.scrollHeight
      );
      console.log("====================================");
      if (div && div.clientHeight < div.scrollHeight) {
        setHasLineBreak(true);
      } else {
        setHasLineBreak(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
*/
