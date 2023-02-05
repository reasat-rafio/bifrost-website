import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { BlogBody } from "lib/@types/blog-types";
import { useIntersection, useWindowSize } from "src/lib/hooks";
import React, {
  Dispatch,
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { VFadeInOut } from "src/animations/fade-in-out";

interface SmScrollSpyProps {
  sectionWrapperHeight: number;
  paddingY: number;
  selected: BlogBody | undefined;
  setSelected: Dispatch<React.SetStateAction<BlogBody>>;
  sections: BlogBody[];
}

export const SmScrollSpy: React.FC<SmScrollSpyProps> = ({
  sectionWrapperHeight,
  selected,
  setSelected,
  sections,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionOnview = useIntersection(sectionRef, { threshold: 0 });
  const [navbarHeight, setNavbarHeight] = useState(0);

  useLayoutEffect(() => {
    const height = document.querySelector("#navbar").clientHeight;
    setNavbarHeight(height);
  }, [windowWidth]);

  return (
    <div
      className="pointer-events-none absolute top-0 z-20 block w-full lg:hidden "
      style={{ height: sectionWrapperHeight }}
      ref={sectionRef}
    >
      <motion.div
        variants={VFadeInOut()}
        initial="from"
        animate={sectionOnview?.isIntersecting ? "to" : "from"}
        className="bifrost__gradient_pink pointer-events-auto sticky  shadow"
        style={{ top: navbarHeight + 5 }}
      >
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button className="bg-copper-500 text-body-sm relative flex w-full items-center justify-between rounded-[4px] py-3 px-4 text-left text-black focus:outline-none">
              {selected?.heading}
              {selected?.heading && (
                <img className="h-4 w-4" src="/icons/chervron-down.svg" />
              )}
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="bifrost__gradient_pink shadow-raise absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-[4px] py-1 text-base shadow-md focus:outline-none">
                {sections.map((section, i) => (
                  <Listbox.Option
                    key={section._key}
                    className={clsx("relative select-none py-2 pr-4 pl-10")}
                    value={section}
                  >
                    {({ active }) => (
                      <>
                        <a
                          href={`#section-${i}`}
                          onClick={(ev) => {
                            ev.preventDefault();
                            document
                              .querySelector(`#section-${i}`)
                              ?.scrollIntoView();
                          }}
                          className={clsx(
                            active
                              ? "text-copper-500 font-bold"
                              : "text-neutral-600"
                          )}
                        >
                          {section.heading}
                        </a>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </motion.div>
    </div>
  );
};
