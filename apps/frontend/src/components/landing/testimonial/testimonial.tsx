import { ITestimonial } from "lib/@types/landing-types";
import { useWindowSize } from "lib/hooks";
import { useLayoutEffect, useRef, useState } from "react";
import { QuotationIcon1, QuotationIcon2 } from "./quotation-icons";
import { truncate } from "lib/helpers";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "utils/sanity";

export const Testimonial: React.FC<ITestimonial> = ({
  image,
  name,
  testimony,
  role,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const blockquoteRef = useRef<HTMLElement>(null);
  const [blockquoteElemHeight, setBlockquoteElemHeight] = useState(0);

  useLayoutEffect(() => {
    const height = blockquoteRef?.current.getBoundingClientRect().height ?? 0;
    setBlockquoteElemHeight(height);
  }, [blockquoteRef]);

  return (
    <section className="flex space-x-2 sm:space-x-5 lg:space-x-10">
      <span
        className="hidden md:block"
        style={{ transform: `translate(0, ${blockquoteElemHeight / 2}px)` }}
      >
        <QuotationIcon1 />
      </span>
      <div className="flex-1">
        <blockquote
          ref={blockquoteRef}
          className="text-base font-[200] sm:text-xl lg:text-2xl xl:text-p-2"
        >
          “{truncate(testimony, 300)}”
        </blockquote>
        <div className="mt-10 flex">
          <figure className="flex-1">
            <SanityImg
              className="max-h-[100px] object-contain"
              width={windowWidth >= 640 ? 100 : 80}
              builder={imageUrlBuilder}
              image={image}
              alt={image?.alt}
            />
          </figure>
          <div className="flex flex-col items-end justify-center space-y-1 font-light">
            <span className="text-base sm:text-xl xl:text-[26px]">{name}</span>
            <span className="text-sm sm:text-lg xl:text-[19px]">{role}</span>
          </div>
        </div>
      </div>
      <span
        className="hidden md:block"
        style={{ transform: `translate(0, ${blockquoteElemHeight / 2}px)` }}
      >
        <QuotationIcon2 />
      </span>
    </section>
  );
};
