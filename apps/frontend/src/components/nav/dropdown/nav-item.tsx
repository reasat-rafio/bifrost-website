import type { MenuItem } from "lib/@types/global-types";
import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "utils/sanity";
import { Pointer } from "../menu-dropdown";
import useGlobalStore from "store/global.store";

interface NavItemProps extends MenuItem {
  activeSubMenuKey: null | string;
  setActiveSubMenuKey: Dispatch<SetStateAction<null | string>>;
}

const NavItem: React.FC<NavItemProps> = ({
  _key,
  title,
  dropdownList,
  pageUrl,
  externalUrl,
  activeSubMenuKey,
  setActiveSubMenuKey,
}) => {
  const { setShowNavDropDown } = useGlobalStore();

  return (
    <>
      <li className="relative  font-semibold">
        {!!dropdownList?.length ? (
          // Has submenu
          <button
            className="container flex w-full items-center justify-between py-[25px] text-[20px] outline-none"
            onClick={() =>
              setActiveSubMenuKey(activeSubMenuKey === _key ? null : _key)
            }
          >
            <span>{title}</span>
            <DirectionArrow active={activeSubMenuKey === _key} />
          </button>
        ) : (
          // No submenu
          <Link href={pageUrl || externalUrl}>
            <a
              onClick={() => setShowNavDropDown(false)}
              className="container block w-full py-[25px] text-[20px]"
            >
              {title}
            </a>
          </Link>
        )}
      </li>
      <AnimatePresence>
        {activeSubMenuKey === _key && (
          <SubMenuItems dropdownList={dropdownList} />
        )}
      </AnimatePresence>
    </>
  );
};

const SubMenuItems: React.FC<{
  dropdownList: MenuItem["dropdownList"];
}> = ({ dropdownList }) => {
  const { setShowNavDropDown } = useGlobalStore();

  return (
    <motion.li
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ ease: "easeInOut" }}
    >
      <ul className="relative z-20 flex flex-col space-y-[14px] py-[25px]">
        {dropdownList?.map(({ _key, description, image, title, url }) => (
          <motion.li
            key={_key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="container flex space-x-5"
          >
            <figure className="col-span-2 flex items-start justify-start">
              <SanityImg
                className="h-[16px] w-[16px] object-contain"
                width={30}
                image={image}
                builder={imageUrlBuilder}
                alt={title}
              />
            </figure>
            <Link href={url}>
              <a
                onClick={() => setShowNavDropDown(false)}
                className="flex flex-1 flex-col"
              >
                <h6 className="text-[14px] font-normal leading-none">
                  {title}
                </h6>
                <span className="mt-[6px] text-[12px] font-light text-[#B6BEE8]">
                  {description}
                </span>
              </a>
            </Link>
          </motion.li>
        ))}
      </ul>
      <Pointer />
    </motion.li>
  );
};

const DirectionArrow: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <motion.svg
      initial={{ rotate: 0 }}
      animate={{ rotate: active ? 180 : 0 }}
      transition={{ ease: "anticipate" }}
      width="20"
      height="12"
      viewBox="0 0 20 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 1.88769L10 11.8877L-4.37114e-07 1.8877L1.775 0.112696L10 8.33769L18.225 0.112695L20 1.88769Z"
        fill="#70FCEB"
      />
    </motion.svg>
  );
};

export default NavItem;
