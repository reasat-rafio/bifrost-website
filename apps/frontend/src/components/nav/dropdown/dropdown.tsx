import clsx from "clsx";
import { Button } from "components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { MenuItem } from "lib/@types/global-types";
import { useScrollBlock, useWindowSize } from "lib/hooks";
import { useEffect, useLayoutEffect, useState } from "react";
import useGlobalStore from "store/global.store";
import NavItem from "./nav-item";

export interface NavbarDropdownProps {
  menu: MenuItem[];
  darkBg: boolean;
}

const Dropdown: React.FC<NavbarDropdownProps> = ({ menu, darkBg }) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const { showNavDropDown } = useGlobalStore();
  const [navbarHeight, setNavbarHeight] = useState(0);
  const highlightBtn = menu.filter((men) => men.highlight)[0];
  const [blockScroll, allowScroll] = useScrollBlock();

  useLayoutEffect(() => {
    setNavbarHeight(document.querySelector("#navbar")?.clientHeight);
  }, [windowWidth]);

  useEffect(() => {
    if (showNavDropDown) blockScroll();
    else allowScroll();
  }, [showNavDropDown]);

  return (
    <AnimatePresence>
      {showNavDropDown && windowWidth < 1024 && (
        <motion.nav
          initial={{ y: "-120%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-120%", opacity: 0, transition: { duration: 0.4 } }}
          transition={{
            type: "spring",
            damping: 30,
            mass: 0.4,
            stiffness: 300,
          }}
          style={{
            top: `${navbarHeight}px`,
            paddingBottom: `${navbarHeight}px`,
          }}
          className={clsx(
            "fixed z-30 h-full min-h-screen w-full overflow-y-auto backdrop-blur-3xl",
            darkBg ? "bg-black/90" : "bg-secondary/5"
          )}
        >
          <div className="">
            <motion.ul
              layout
              className="flex flex-col justify-center divide-y divide-[#8B52FF]/40 border-b border-[#8B52FF]/40"
            >
              {menu
                .filter((men) => !men.highlight)
                .map((menuItem) => (
                  <NavItem key={menuItem._key} {...menuItem} />
                ))}
            </motion.ul>
            {!!highlightBtn && (
              <div className="container block w-full px-[16px] py-[25px]">
                <Button
                  type="href"
                  href={highlightBtn.pageUrl || highlightBtn.externalUrl}
                >
                  {highlightBtn?.title}
                </Button>
              </div>
            )}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Dropdown;
