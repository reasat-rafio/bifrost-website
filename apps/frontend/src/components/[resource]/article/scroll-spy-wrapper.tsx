import clsx from "clsx";
import { BlogBody } from "lib/@types/blog-types";
import React, {
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Scrollspy } from "./body/scrollspy";
import { motion } from "framer-motion";
import { SmScrollSpy } from "components/[blog]/sm-scroll-spy";
import { useWindowSize } from "lib/hooks";

export const ScrollSpyWrapper: React.FC<ScrollSpyProps> = ({
  sections,
  sectionRefs,
  paddingY,
  children,
}) => {
  const [sectionWrapperHeight, setSectionWrapperHeight] = useState(0);
  const [currentelElementIndex, setCurrentElementIndex] = useState(0);
  const [selected, setSelected] = useState<BlogBody | undefined>(sections[0]);

  useEffect(() => {
    const selectedSection = sections.find((_, i) => {
      return i === currentelElementIndex;
    });
    const sectionWrapperScrollHeight =
      document.querySelector("[data-cy='section-wrapper']")?.scrollHeight ?? 0;

    setSelected(selectedSection);
    setSectionWrapperHeight(sectionWrapperScrollHeight);
  }, [currentelElementIndex, sections]);

  return (
    <Scrollspy sectionRefs={sectionRefs} offset={-150}>
      {({ currentElementIndexInViewport }) => (
        <ScrollspyBody
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

interface ScrollSpyProps {
  sections: BlogBody[];
  paddingY: number;
  sectionRefs: RefObject<HTMLDivElement>[];
}

const ScrollspyBody = ({
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
    <div className="grid lg:grid-cols-13">
      {children}
      <Navigations
        paddingY={paddingY}
        selected={selected}
        setSelected={setSelected}
        sections={sections}
        sectionWrapperHeight={sectionWrapperHeight}
        currentElementIndexInViewport={currentElementIndexInViewport}
      />
    </div>
  );
};

const Navigations = ({
  paddingY,
  setSelected,
  selected,
  sections,
  currentElementIndexInViewport,
  sectionWrapperHeight,
}) => {
  const { height: windowHeight, width: windowWidth } = useWindowSize() ?? {
    height: 0,
    width: 0,
  };
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const [stickyContainerHeight, setStickyContainerHeight] = useState(0);

  useLayoutEffect(() => {
    if (stickyContainerRef?.current)
      setStickyContainerHeight(stickyContainerRef.current.clientHeight);
  }, [stickyContainerRef, windowWidth]);

  return (
    <aside className="relative col-span-3">
      <div
        ref={stickyContainerRef}
        className="sticky top-20 hidden p-4 lg:flex lg:space-x-5"
      >
        <div
          style={{
            height: `${Math.min(stickyContainerHeight, windowHeight - 20)}px`,
          }}
          className="primary__gradient left-0 top-0 h-full w-1 rounded"
        />

        <ul className="mx-auto flex-1 space-y-6">
          {sections.map((section: any, i: number) => (
            <li key={section._key} className="flex items-center space-x-4 ">
              <motion.span
                animate={{
                  color:
                    currentElementIndexInViewport === i ? "#70FCEB" : "#B5B5B5",
                }}
                onClick={() =>
                  document.querySelector(`#section-${i}`)?.scrollIntoView()
                }
                className={clsx(
                  "cursor-pointer text-[16px] capitalize",
                  currentElementIndexInViewport === i
                    ? "font-normal"
                    : "font-light "
                )}
              >
                {section.heading.toLowerCase()}
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
    </aside>
  );
};
