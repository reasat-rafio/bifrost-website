import clsx from "clsx";
import { motion } from "framer-motion";
import { animationFrameEffect, useVisibleScrollEffect } from "src/lib/hooks";
import {
  Dispatch,
  ReactElement,
  RefObject,
  SetStateAction,
  useRef,
} from "react";
import { useWindowSize } from "react-use";
import { SanityImg } from "sanity-react-extra";
import { Enterprise as EnterpriseInterface } from "lib/@types/use-case-types";
import { imageUrlBuilder } from "utils/sanity";
// import Button from './ui/_Button'

interface EnterpriseProps {
  item: EnterpriseInterface;
  index: number;
  rootRef: RefObject<Element>;
  length: number;
  setCurrent: Dispatch<SetStateAction<number>>;
  current: number;
  isScroll: boolean;
}

export default function Enterprise({
  item,
  index,
  rootRef,
  length,
  setCurrent,
  current,
  isScroll,
}: EnterpriseProps): ReactElement {
  const sectionRef = useRef<HTMLDivElement>(null);

  // const [transition, setTransition] = useState(0)
  const { height: windowHeight, width: windowWidth } = useWindowSize() ?? {
    width: 0,
    height: 0,
  };

  const toggleVisibility = function (visible: boolean) {
    if (visible) {
      sectionRef.current.style.transform = `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;
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

        if (isScroll) {
          if (current !== index) {
            toggleVisibility(false);
          } else {
            toggleVisibility(true);
          }
        } else if (sectionRef.current) {
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
    [windowHeight, isScroll, current]
  );

  return (
    <motion.div
      className={clsx(
        "relative flex h-full w-full items-center opacity-0 transition-all duration-500",
        item.imagePosition === "center" && "justify-center",
        item.imagePosition === "right" && "justify-end",
        item.imagePosition === "left" && "justify-start"
      )}
      ref={sectionRef}
      style={{
        zIndex: 10 - index,
        opacity: 1,
      }}
    >
      <div
        className={clsx(
          "rounded-lg object-contain",
          item.imagePosition !== "center" && "h-[50%] w-[60%] lg:h-[70%]",
          item.imagePosition === "center" && "w-full"
        )}
      >
        <SanityImg
          className="h-full w-full rounded-xl object-cover md:object-contain"
          builder={imageUrlBuilder}
          image={item.image}
          alt={item.image?.alt || "image"}
          height={windowWidth >= 768 ? 1000 : 500}
        />
      </div>
      <div
        className={clsx(
          "absolute flex h-full w-full",
          item.cardPosition === "bottom-right" &&
            "translate-y-[-20%] translate-x-[-5%] items-end justify-end md:translate-y-[-20%] lg:translate-y-[-10%] xl:translate-y-[-1%] xl:translate-x-[-10%] 2xl:translate-y-[-5%]",
          item.cardPosition === "bottom-left" &&
            "translate-y-[-20%] translate-x-[5%] items-end justify-start md:translate-y-[-20%] lg:translate-y-[-10%] xl:translate-y-[-1%] xl:translate-x-[10%] 2xl:translate-y-[-5%]",
          item.cardPosition === "left" && "items-center justify-start",
          item.cardPosition === "right" && "items-center justify-end"
        )}
      >
        <div
          className={clsx(
            "bifrost__transparent_card w-[70vw] rounded-lg p-4 md:max-w-md lg:max-w-xl lg:p-10 xl:max-w-2xl xl:space-y-10"
          )}
        >
          <div className="flex-col space-y-3 md:space-y-10">
            <h5 className="text-[22px] font-[275] leading-[22px] lg:text-head-4">
              {item.headline}
            </h5>
            {!!item?.subtitle && (
              <h6 className="| text-[22px] font-light leading-none md:text-p-2 xl:text-[30px]">
                {item.subtitle}
              </h6>
            )}
            <div className="text-[14px] font-[300] leading-[16px] lg:text-body-1">
              {item.body}
            </div>
            <div className="flex">
              {/* <Button>
                <a href={item.ctaButton.href}>{item.ctaButton.title}</a>
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
