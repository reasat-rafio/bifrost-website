import clsx from "clsx";
import { animationFrameEffect, useVisibleScrollEffect } from "src/lib/hooks";
import {
  Dispatch,
  ReactElement,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useWindowSize } from "react-use";
import { SanityImg } from "sanity-react-extra";
import { Service as ServiceInterface } from "lib/@types/landing-types";
import { imageUrlBuilder } from "utils/sanity";
// import Button from './ui/_Button'
// import { Heading } from './ui/heading'
import { Description } from "./ui/description";
import { isWhatPercentOf } from "src/lib/helpers";

interface ServiceProps {
  item: ServiceInterface;
  index: number;
  rootRef: RefObject<Element>;
  length: number;
  setCurrent: Dispatch<SetStateAction<number>>;
  current: number;
}

export default function Service({
  item: { body, cardPosition, image, imagePosition, subtitle },
  index,
  rootRef,
  length,
  setCurrent,
  current,
}: ServiceProps): ReactElement {
  const sectionRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const [containerOffsetY, setContainerOffsetY] = useState(0);

  useEffect(() => {
    if (cardPosition === "left")
      setContainerOffsetY(
        isWhatPercentOf(90 / 2, descriptionRef?.current.clientWidth)
      );
    else if (cardPosition === "bottom-right" || cardPosition === "bottom-left")
      setContainerOffsetY(
        isWhatPercentOf(-60 / 2, descriptionRef?.current.clientWidth)
      );
    else if (cardPosition === "right")
      setContainerOffsetY(
        isWhatPercentOf(-70 / 2, descriptionRef?.current.clientWidth)
      );
  }, [current]);

  const { height: windowHeight, width: windowWidth } = useWindowSize() ?? {
    width: 0,
    height: 0,
  };

  const toggleVisibility = (visible: boolean) => {
    if (visible) {
      sectionRef.current.style.transform = `translate3d(0px, ${
        windowWidth <= 1024 ? `${containerOffsetY / 2}px` : "0px"
      }, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;
      sectionRef.current.style.opacity = "1";
    } else {
      sectionRef.current.style.transform = `translate3d(0px, -120%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;
      sectionRef.current.style.opacity = "0";
    }
  };

  useVisibleScrollEffect(
    rootRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        const yDelta = y + windowHeight - offsetBoundingRect.top;
        const ratio = Math.max(0, Math.min(yDelta / windowHeight, length));

        let transitionYValue = 0;
        let sectionRatio = 0;

        if (index === length - 2) {
          sectionRatio = 0;
        } else if (ratio >= 0 && ratio < index + 1.5) {
          sectionRatio = 0;
          transitionYValue = 0;
        } else if (ratio > index + 1.5 && ratio < index + 2) {
          sectionRatio = ratio - (index + 1);
          transitionYValue = 0 + (0.5 - sectionRatio) * 200;
        } else {
          sectionRatio = 1;
          transitionYValue = -120;
        }

        // if (isScroll) {
        //   if (current !== index) {
        //     toggleVisibility(false)
        //   } else {
        //     toggleVisibility(true)
        //   }
        // }
        if (sectionRef.current) {
          if (transitionYValue === -120) {
            toggleVisibility(false);
          } else {
            toggleVisibility(true);
            if (ratio >= index + 1 || (ratio < 1 && index === 0)) {
              setCurrent(index);
            } else {
              toggleVisibility(false);
            }
          }
        }
      }),
    [windowHeight, current]
  );

  return (
    <div
      className={clsx(
        "relative z-30 flex h-full w-full transform items-center opacity-0 transition-all duration-300",
        imagePosition === "full" && "justify-center",
        imagePosition === "right" && "justify-center xl:justify-end",
        imagePosition === "left" && "justify-center xl:justify-start"
      )}
      ref={sectionRef}
    >
      <div
        className={clsx(
          imagePosition !== "full" && "h-full w-full lg:h-[70%] lg:w-[60%]"
        )}
      >
        <SanityImg
          className="max-h-[50vh] w-full rounded-primary object-cover lg:max-h-[65vh]"
          builder={imageUrlBuilder}
          image={image}
          alt={image?.alt || "image"}
          height={windowWidth >= 768 ? 1000 : 500}
        />
      </div>
      <div
        ref={descriptionRef}
        className={clsx(
          "bifrost__transparent_card absolute flex w-[90%] flex-col space-y-2 rounded-lg p-3 lg:w-[70%] lg:space-y-6 lg:p-12 xl:p-6 2xl:w-[55%]",
          cardPosition === "bottom-right" &&
            "right-[5%] bottom-0 translate-y-[60%] lg:translate-y-[25%] 3xl:translate-y-[35%]",
          cardPosition === "bottom-left" &&
            "left-[5%] bottom-0 translate-y-[60%] lg:translate-y-[25%] 3xl:translate-y-[35%]",
          cardPosition === "left" &&
            "translate-y-[-90%] lg:translate-y-0 xl:left-0 xl:translate-y-0",
          cardPosition === "right" &&
            "translate-y-[70%] lg:right-0 lg:translate-y-[25%] xl:translate-y-0"
        )}
      >
        {/* <Header>{headline}</Header> */}
        {!!subtitle && (
          <h6 className="| text-[22px] font-light leading-none md:text-p-2 xl:text-[30px]">
            {subtitle}
          </h6>
        )}
        <Description>{body}</Description>
        <div className="flex">
          {/* <Button>
            <a href={ctaButton.href}>{ctaButton.title}</a>
          </Button> */}
        </div>
      </div>
    </div>
  );
}
