import type { MenuItem } from "lib/@types/global-types";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "utils/sanity";
import { AnimatedText, ArrowICon, Pointer } from "../menu-dropdown";

const NavItem: React.FC<MenuItem> = ({
  title,
  dropdownList,
  pageUrl,
  externalUrl,
}) => {
  const [active, setActive] = useState(false);

  return (
    <>
      <li className="relative py-[25px] px-[16px] text-body-3 font-semibold">
        {!!dropdownList?.length ? (
          <button
            className="flex w-full items-center justify-between outline-none"
            onClick={() => setActive(!active)}
          >
            <span>{title}</span>
            {!!dropdownList?.length && <DirectionArrow active={active} />}
          </button>
        ) : (
          <Link href={pageUrl || externalUrl}>
            <a>{title}</a>
          </Link>
        )}
      </li>
      <AnimatePresence>
        {active && <SubMenuItems dropdownList={dropdownList} />}
      </AnimatePresence>
    </>
  );
};

const SubMenuItems: React.FC<{
  dropdownList: MenuItem["dropdownList"];
}> = ({ dropdownList }) => {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut" }}
      className="px-[16px] py-[25px]"
    >
      <ul className="relative z-20 flex flex-col space-y-[14px]">
        {dropdownList?.map(({ _key, description, image, title, ctaButton }) => (
          <motion.li
            key={_key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex space-x-5 "
          >
            <figure className="col-span-2 flex items-start justify-start">
              <SanityImg
                className="h-[24px] w-[24px] object-contain"
                width={30}
                image={image}
                builder={imageUrlBuilder}
                alt={title}
              />
            </figure>
            <section className="flex flex-1 flex-col space-y-[6px]">
              <h6 className="text-body-3 uppercase">{title}</h6>
              <span className="text-[#B6BEE8]">{description}</span>
              {!!ctaButton && (
                <Link href={ctaButton?.href ?? "/"}>
                  <a className="flex space-x-3 overflow-hidden text-[#B37AF8]">
                    <AnimatedText text={ctaButton.title} />
                    <ArrowICon />
                  </a>
                </Link>
              )}
            </section>
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
      width="20"
      height="12"
      viewBox="0 0 20 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 1.88769L10 11.8877L-4.37114e-07 1.8877L1.775 0.112696L10 8.33769L18.225 0.112695L20 1.88769Z"
        fill="#B37AF8"
      />
    </motion.svg>
  );
};

export default NavItem;
