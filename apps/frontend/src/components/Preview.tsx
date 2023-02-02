import {
  animationFrameEffect,
  useVisibleScrollEffect,
  useWindowSize,
} from "src/lib/hooks";
import React, { RefObject, useRef } from "react";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "utils/sanity";

interface PreviewProps {
  item: any;
  index: number;
  rootRef: RefObject<Element>;
  length: number;
}

export const Preview: React.FC<PreviewProps> = ({
  item,
  index,
  length,
  rootRef,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { height: windowHeight, width: windowWidth } = useWindowSize() ?? {
    width: 0,
    height: 0,
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
          transitionYValue = -100;
        }

        if (sectionRef.current) {
          sectionRef.current.animate(
            {
              transform: `translate3d(0px, ${transitionYValue}%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
            },
            {
              duration: 350,
              fill: "forwards",
            }
          );
          sectionRef.current.animate(
            {
              // scale: Math.max(1 - sectionRatio / 20, 0.8),
              opacity: Math.max(1 - sectionRatio * 1.1, 0),
            },
            {
              duration: 300,
              delay: 150,
              fill: "forwards",
            }
          );
        }
      }),
    [windowHeight]
  );

  return (
    <div
      ref={sectionRef}
      className="absolute rounded-primary 2xl:w-full"
      style={{
        zIndex: 10 - index,
      }}
    >
      <figure className="aspect-video max-h-[70vh] w-full">
        <SanityImg
          className="| h-full w-full rounded-lg object-cover"
          builder={imageUrlBuilder}
          image={item}
          width={windowWidth >= 1440 ? 1200 : windowWidth >= 1025 ? 800 : 600}
          alt={item.alt ?? "image"}
        />
      </figure>
    </div>
  );
};
