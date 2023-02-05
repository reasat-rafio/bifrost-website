import clsx from "clsx";
import { BlogBody } from "lib/@types/blog-types";
import React, { RefObject, useEffect, useState } from "react";
import { Scrollspy } from "./body/scrollspy";
import { motion } from "framer-motion";
import { SmScrollSpy } from "components/[blog]/sm-scroll-spy";

interface ScrollSpyProps {
  sections: BlogBody[];
  paddingY: number;
  sectionRefs: RefObject<HTMLDivElement>[];
}

const ScrollspyBody = ({
  dividerHeight,
  sections,
  currentElementIndexInViewport,
  setCurrentElementIndex,
  sectionWrapperHeight,
  paddingY,
  selected,
  setSelected,
  children,
}) => {
  setCurrentElementIndex(currentElementIndexInViewport);

  return (
    <div className="grid lg:grid-cols-12 lg:gap-10">
      <div className="relative col-span-3">
        <span
          style={{ height: `${dividerHeight}px` }}
          className="absolute top-0 right-0 hidden w-[2px] rounded-[3px] bg-gradient-to-b from-[#f8e9ff] via-[#e4acff] to-[#7187ff] opacity-60 lg:block"
        />
        <div className="sticky top-20 hidden p-4 lg:block">
          <ul
            data-cy="nav-wrapper"
            className="mx-auto w-[90%] space-y-6 2xl:w-[70%] 3xl:w-[60%] "
          >
            {sections.map((section, i) => (
              <li key={section._key} className="flex items-center space-x-4 ">
                <span
                  style={{ transform: `matrix(-1, 0, 0, 1, 0, 0)` }}
                  className={clsx(
                    "h-[2px] w-[18px]",
                    currentElementIndexInViewport === i
                      ? "bifrost__gradient_pink"
                      : "bg-[#B5B5B5]"
                  )}
                />
                <motion.span
                  animate={{
                    color:
                      currentElementIndexInViewport === i
                        ? "#000610"
                        : "#B5B5B5",
                  }}
                  onClick={() =>
                    document.querySelector(`#section-${i}`)?.scrollIntoView()
                  }
                  className={clsx(
                    "cursor-pointer text-[20px]",
                    currentElementIndexInViewport === i
                      ? "font-normal"
                      : "font-light "
                  )}
                >
                  {section.heading}
                </motion.span>
              </li>
            ))}
          </ul>
        </div>
        <SmScrollSpy
          sectionWrapperHeight={sectionWrapperHeight}
          paddingY={paddingY}
          selected={selected}
          setSelected={setSelected}
          sections={sections}
        />
      </div>
      {children}
    </div>
  );
};

export const ScrollSpyWrapper: React.FC<ScrollSpyProps> = ({
  sections,
  sectionRefs,
  paddingY,
  children,
}) => {
  const [sectionWrapperHeight, setSectionWrapperHeight] = useState(0);
  const [currentelElementIndex, setCurrentElementIndex] = useState(0);
  const [dividerHeight, setDividerHeight] = useState(0);

  const [selected, setSelected] = useState<BlogBody | undefined>(sections[0]);

  useEffect(() => {
    const selectedSection = sections.find((_, i) => {
      return i === currentelElementIndex;
    });
    const sectionWrapperScrollHeight =
      document.querySelector("[data-cy='section-wrapper']")?.scrollHeight ?? 0;
    const pageDividerHeight =
      document.querySelector(".blog-introduction")?.scrollHeight ?? 0;

    setSelected(selectedSection);
    setDividerHeight(pageDividerHeight);
    setSectionWrapperHeight(sectionWrapperScrollHeight);
  }, [currentelElementIndex, sections]);

  return (
    <Scrollspy sectionRefs={sectionRefs} offset={-150}>
      {({ currentElementIndexInViewport }) => (
        <ScrollspyBody
          dividerHeight={dividerHeight}
          sections={sections}
          currentElementIndexInViewport={currentElementIndexInViewport}
          setCurrentElementIndex={setCurrentElementIndex}
          sectionWrapperHeight={sectionWrapperHeight}
          paddingY={paddingY}
          selected={selected}
          setSelected={setSelected}
          children={children}
        />
      )}
    </Scrollspy>
  );
};
