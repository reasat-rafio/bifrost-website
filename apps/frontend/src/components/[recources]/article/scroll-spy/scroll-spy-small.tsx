import { motion, AnimatePresence } from "framer-motion";
import { SectionHeaderProps } from "./scroll-spy-big";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import clsx from "clsx";

interface ScrollSpySmallProps {
  className?: string;
  sectionHeaders: SectionHeaderProps[];
  navHeight: number;
  intersecting: boolean;
}

export const ScrollSpySmall: React.FC<ScrollSpySmallProps> = ({
  intersecting,
  navHeight,
  sectionHeaders,
  className,
}) => {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    setActiveSection(sectionHeaders[0]);
  }, [sectionHeaders]);

  return (
    <AnimatePresence>
      {intersecting && !!activeSection?.text && (
        <motion.aside
          className={clsx("fixed left-0 top-20 z-20 w-full", className)}
        >
          <div className="container mx-auto rounded shadow">
            <Listbox value={activeSection} onChange={setActiveSection}>
              <div className="relative mt-1 capitalize">
                <Listbox.Button className="primary__gradient relative flex w-full items-center justify-between rounded-[4px] p-4 text-left text-base font-semibold text-white drop-shadow-xl focus:outline-none">
                  {activeSection?.text}
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="primary__gradient shadow-raise absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-[4px] py-1 text-base shadow-md focus:outline-none">
                    {sectionHeaders.map((section, i) => (
                      <Listbox.Option
                        key={section._key}
                        className={clsx("relative select-none p-4 py-2")}
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
                              {section.text}
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
