import { motion, AnimatePresence } from "framer-motion";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { useWindowSize } from "lib/hooks";
import { Dispatch, Fragment, useLayoutEffect, useState } from "react";
import { BlogBody } from "lib/@types/blog-types";

interface ScrollSpySmallProps {
  className?: string;
  intersecting: boolean;
  sections: any[];
  selected: BlogBody | undefined;
  setSelected: Dispatch<React.SetStateAction<BlogBody>>;
}

export const NavSmall: React.FC<ScrollSpySmallProps> = ({
  intersecting,
  sections,
  className,
  selected,
  setSelected,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const [navbarHeight, setNavbarHeight] = useState(0);

  useLayoutEffect(() => {
    const height = document.querySelector("#navbar").clientHeight;
    setNavbarHeight(height);
  }, [windowWidth]);

  return (
    <AnimatePresence>
      {intersecting && (
        <motion.aside
          style={{ top: `${navbarHeight}px` }}
          className={clsx("fixed left-0 z-20 w-full", className)}
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{
            duration: 0.5,
            type: "tween",
            ease: "anticipate",
          }}
        >
          <div className="container mx-auto rounded shadow">
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-1 capitalize">
                <Listbox.Button className="primary__gradient relative flex w-full items-center justify-between rounded-[4px] p-4 text-left text-base font-semibold capitalize text-white drop-shadow-xl focus:outline-none">
                  {selected?.heading}
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="primary__gradient shadow-raise absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-[4px] py-1 text-sm shadow-md focus:outline-none">
                    {sections.map((section, i) => (
                      <Listbox.Option
                        key={section._key}
                        className="relative select-none p-4 py-2 capitalize"
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
                              {section.heading.toLowerCase()}
                            </a>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
