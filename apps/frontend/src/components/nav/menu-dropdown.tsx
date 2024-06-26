import { Portal } from "@reach/portal";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { SanityImg } from "sanity-react-extra";
import useGlobalStore from "store/global.store";
import useMegamenuDropownStore from "store/megamenu-dropdown.store";
import { imageUrlBuilder } from "utils/sanity";

interface MenuDropdownProps {}
const MenuDropdown: React.FC<MenuDropdownProps> = ({}) => {
  const {
    modalState,
    position: { x },
    data,
    setModalState,
    setInterseting,
  } = useMegamenuDropownStore();
  const {
    navbarDimentions: { height },
  } = useGlobalStore();

  return (
    <Portal>
      <AnimatePresence>
        {modalState === "visible" && (
          <motion.div
            initial={{ opacity: 0, x }}
            animate={{ opacity: 1, x }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut" }}
            style={{ top: `${height + 20}px` }}
            className="fixed z-20 w-[358px] rounded-[8px] border border-gray/60 bg-[#0A0A0E]/90 p-7 text-white backdrop-blur-3xl "
            onMouseLeave={() => {
              setInterseting(false);
              setModalState("hidden");
            }}
            onMouseEnter={() => setInterseting(true)}
          >
            <ul className="relative z-20 flex max-h-[65vh] flex-col space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary">
              {data?.map(({ _key, description, image, title, url }) => (
                <motion.li
                  key={_key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Link href={url} passHref>
                    <motion.a
                      whileHover={{ backgroundColor: "#1A1E20" }}
                      className="flex space-x-5 rounded-[8px] p-[14px]"
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
                      <section className="flex flex-1 flex-col space-y-[10px]">
                        <h6 className="text-body-3">{title}</h6>
                        {!!description && (
                          <span className="text-[14px] font-[200] leading-[20px] tracking-[0px] text-white">
                            {description}
                          </span>
                        )}
                      </section>
                    </motion.a>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Pointer />
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

// export const AnimatedText: React.FC<{ text: string; className?: string }> = ({
//   text,
//   className = "text-[14px]",
// }) => {
//   const [hovered, setHover] = useState(false);
//   const letters = Array.from(text);

//   return (
//     <div
//       className={clsx("flex", className)}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//     >
//       {letters.map((letter, index) => (
//         <motion.span
//           className="block whitespace-pre-wrap"
//           key={letter + index}
//           initial={{ y: 0 }}
//           animate={{
//             y: hovered ? [0, 1.5, 0] : 0,
//             transition: {
//               delay: index * 0.05,
//             },
//           }}
//         >
//           {letter}
//         </motion.span>
//       ))}
//     </div>
//   );
// };

// export const ArrowICon: React.FC<{}> = () => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={1.5}
//       stroke="currentColor"
//       className="h-6 w-6"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
//       />
//     </svg>
//   );
// };

export const Pointer: React.FC<{}> = () => {
  const { setInterseting } = useMegamenuDropownStore();

  return (
    <div
      onMouseEnter={() => setInterseting(true)}
      style={{ clipPath: `polygon(0 0, 100% 0, 100% 100%, 50% 50%)` }}
      className="absolute top-0 h-7 w-7 -translate-y-1/2 -rotate-45 rounded border-t border-r border-gray/60 bg-[#0A0A0E]"
    />
  );
};

export default MenuDropdown;
