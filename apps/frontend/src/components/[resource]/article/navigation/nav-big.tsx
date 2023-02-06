import clsx from "clsx";
import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useWindowSize } from "lib/hooks";

interface ScrollSpyProps {
  sections: any[];
  currentElementIndexInViewport: number;
}

export const NavBig: React.FC<ScrollSpyProps> = ({
  sections,
  currentElementIndexInViewport,
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
    <nav
      ref={stickyContainerRef}
      className="sticky top-20 hidden overflow-visible p-4 lg:flex lg:space-x-5"
    >
      <div
        style={{
          height: `${Math.min(stickyContainerHeight, windowHeight - 20)}px`,
        }}
        className="primary__gradient left-0 top-0 w-1 rounded"
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
    </nav>
  );
};
