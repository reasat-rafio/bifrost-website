import { BlogBody } from "lib/@types/blog-types";
import React, { RefObject, useEffect, useState } from "react";
import { Scrollspy } from "./scrollspy";
import { NavBig } from "./navigation/nav-big";
import { NavSmall } from "./navigation/nav-small";

export const ScrollSpyWrapper: React.FC<ScrollSpyProps> = ({
  sections,
  sectionRefs,
  children,
  intersecting,
}) => {
  const [currentelElementIndex, setCurrentElementIndex] = useState(0);
  const [selected, setSelected] = useState<BlogBody | undefined>(sections[0]);

  useEffect(() => {
    const selectedSection = sections.find((_, i) => {
      return i === currentelElementIndex;
    });

    setSelected(selectedSection);
  }, [currentelElementIndex, sections]);

  return (
    <Scrollspy sectionRefs={sectionRefs} offset={-150}>
      {({ currentElementIndexInViewport }) => (
        <ScrollspyBody
          sections={sections}
          currentElementIndexInViewport={currentElementIndexInViewport}
          setCurrentElementIndex={setCurrentElementIndex}
          selected={selected}
          setSelected={setSelected}
          intersecting={intersecting}
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
  intersecting: boolean;
}

const ScrollspyBody = ({
  sections,
  currentElementIndexInViewport,
  setCurrentElementIndex,
  selected,
  setSelected,
  intersecting,
  children,
}) => {
  setCurrentElementIndex(currentElementIndexInViewport);

  return (
    <div className="grid lg:grid-cols-13">
      {children}
      <Navigations
        selected={selected}
        setSelected={setSelected}
        sections={sections}
        intersecting={intersecting}
        currentElementIndexInViewport={currentElementIndexInViewport}
      />
    </div>
  );
};

const Navigations = ({
  setSelected,
  selected,
  sections,
  currentElementIndexInViewport,
  intersecting,
}) => {
  return (
    <aside className="relative col-span-3">
      <NavBig
        currentElementIndexInViewport={currentElementIndexInViewport}
        sections={sections}
      />
      <NavSmall
        selected={selected}
        setSelected={setSelected}
        intersecting={intersecting}
        sections={sections}
      />
      {/* <SmScrollSpy
        sectionWrapperHeight={sectionWrapperHeight}
        paddingY={paddingY}
        selected={selected}
        setSelected={setSelected}
        sections={sections}
      /> */}
    </aside>
  );
};
