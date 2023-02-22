import { imageUrlBuilder } from "utils/sanity";
import clsx from "clsx";
import {
  useWindowScroll,
  useWindowSize,
  useWindowSizeEffect,
} from "src/lib/hooks";
import { useRouter } from "next/router";
import {
  ReactElement,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion } from "framer-motion";
import { DropdownListProps, MenuItem } from "lib/@types/global-types";
import Link from "next/link";
import { Button } from "../ui/button";
import useGlobalStore from "../../store/global.store";
import useMegamenuDropownStore from "store/megamenu-dropdown.store";

interface NavbarProps {
  logo: SanityImage;
  darkLogo: SanityImage;
  menu: MenuItem[];
  darkBg?: boolean;
}

export default function Navbar({
  logo,
  menu,
  darkBg,
}: NavbarProps): ReactElement {
  const router = useRouter();
  const navbarRef = useRef<HTMLElement>(null);
  const { showNavDropDown, setShowNavDropDown, setNabarDimensions } =
    useGlobalStore();
  const { interseting, modalState, setModalState, setPosition, setData } =
    useMegamenuDropownStore();
  const [smallNav, setSmallNav] = useState(false);
  const scroll = useWindowScroll()?.y ?? 0;
  const highlightBtn = menu.filter((men) => men.highlight)[0];
  const { height: windowHeight, width: windowWidth } = useWindowSize() ?? {
    height: 0,
    width: 0,
  };

  // Use a ref to access the current interseting value in an async callback.
  const _intersetingRef = useRef(interseting);
  _intersetingRef.current = interseting;

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (!_intersetingRef.current && modalState === "visible") {
        setModalState("hidden");
      }
    }, 300);
  };
  const triggerDropdownAction = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      data: DropdownListProps[]
    ) => {
      const { x, y } = event.currentTarget.getBoundingClientRect();
      setData(data);
      setModalState("visible");
      setPosition({ x, y });
    },
    [windowHeight, windowWidth]
  );

  const onHoverCloseDropdownAction = useCallback(() => {
    setModalState("hidden");
  }, [interseting]);

  useLayoutEffect(() => {
    if (navbarRef.current) {
      setNabarDimensions({
        width: navbarRef.current.offsetWidth,
        height: navbarRef.current.offsetHeight,
      });
    }
  }, [windowHeight, windowWidth]);

  useWindowSizeEffect(
    (w, _) => {
      if (!smallNav) {
        setShowNavDropDown(false);
      }
      setSmallNav(w < 1024);
    },
    [setShowNavDropDown]
  );

  return (
    <nav
      ref={navbarRef}
      id="navbar"
      onMouseLeave={handleMouseLeave}
      className={clsx(
        "fixed top-0 left-0 z-40 w-full border-b border-white/5",
        scroll
          ? smallNav
            ? darkBg
              ? "bg-black/90 backdrop-blur-3xl"
              : "bg-secondary/5 backdrop-blur-3xl"
            : ""
          : "shadow",
        smallNav && darkBg
          ? "bg-black/90 backdrop-blur-3xl"
          : `backdrop-blur-3xl ${darkBg ? "bg-black/90" : "bg-secondary/5"}`,
        showNavDropDown && "bg-secondary/5 backdrop-blur-3xl"
      )}
    >
      <div className="container">
        <motion.div
          initial={{ padding: "14px 0" }}
          animate={{ padding: scroll ? `10px 0` : `14px 0` }}
          transition={{ type: "spring", duration: 0.4 }}
          className="mx-auto flex w-full items-center justify-between space-x-5"
        >
          <motion.figure
            initial={{ scale: 1 }}
            animate={{ scale: scroll ? 0.8 : 1, originX: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="h-12 xl:h-14 2xl:h-16"
          >
            <Link href={"/"} passHref>
              <a>
                <SanityImg
                  builder={imageUrlBuilder}
                  image={logo}
                  height={120}
                  alt="Bifrost logo"
                  className={clsx(
                    "h-full w-full cursor-pointer object-contain transition-all"
                  )}
                />
              </a>
            </Link>
          </motion.figure>
          <motion.ul
            initial={{ display: "flex" }}
            animate={{ display: smallNav ? "none" : "flex" }}
            transition={{ delay: smallNav ? 0.4 : 0 }}
            className="| flex-1 items-center justify-center space-x-7 xl:space-x-[60px]"
          >
            {menu
              .filter((men) => !men.highlight)
              .map(({ _key, title, pageUrl, externalUrl, dropdownList }) => (
                <motion.li
                  key={_key}
                  initial={{ y: 0 }}
                  animate={{ y: smallNav ? "-300%" : 0 }}
                  transition={{
                    duration: 0.4,
                    type: "tween",
                    ease: "backInOut",
                  }}
                  className={clsx(
                    "relative text-body-1-mobile font-semibold xl:text-body-3",
                    router.asPath === pageUrl
                      ? "primary__gradient break-words bg-clip-text text-transparent"
                      : "text-white"
                  )}
                >
                  {!dropdownList?.length ? (
                    <Link href={pageUrl || externalUrl}>
                      <a onMouseEnter={onHoverCloseDropdownAction}>{title}</a>
                    </Link>
                  ) : (
                    <button
                      ref={useCallback(
                        (node: HTMLButtonElement) => {
                          if (node) {
                            const { x, y } = node.getBoundingClientRect();
                            setPosition({ x, y });
                          }
                        },
                        [windowHeight, windowWidth]
                      )}
                      onClick={() => {
                        switch (modalState) {
                          case "hidden":
                            setModalState("visible");
                            break;
                          case "visible":
                            setModalState("hidden");
                            break;
                        }
                      }}
                      onMouseEnter={(e) =>
                        triggerDropdownAction(e, dropdownList)
                      }
                    >
                      {title}
                    </button>
                  )}
                  {router.asPath === pageUrl && (
                    <motion.div
                      layout
                      className="primary__gradient absolute left-0 h-[0.2em] w-[60%]"
                      layoutId="underline"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.li>
              ))}
          </motion.ul>
          <motion.div>
            {smallNav ? (
              <figure
                onClick={() => setShowNavDropDown(!showNavDropDown)}
                className="cursor-pointer"
              >
                <img width={20} height={12} src="/burger.svg" alt="Menu" />
              </figure>
            ) : (
              <Button
                type="href"
                href={highlightBtn.externalUrl || highlightBtn.pageUrl}
              >
                {highlightBtn.title}
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </nav>
  );
}
