import { Portal } from '@reach/portal'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { DropdownListProps } from 'lib/@types/global-types'
import Link from 'next/link'
import { SanityImg } from 'sanity-react-extra'
import useGlobalStore from 'store/global.store'
import useMegamenuDropownStore from 'store/megamenu-dropdown.sore'
import { imageUrlBuilder } from 'utils/sanity'

interface MenuDropdownProps {}

// const container: Variants = {
//   hidden: {
//     opacity: 0.5,
//   },
//   visible: (i: number = 1) => ({
//     opacity: 1,
//     transition: { staggerChildren: 0.05, delayChildren: i * 0.1 },
//   }),
// }

// const child: Variants = {
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       type: 'spring',
//       damping: 12,
//       stiffness: 200,
//     },
//   },
//   hidden: {
//     opacity: 0.6,
//     y: 20,
//     transition: {
//       type: 'spring',
//       damping: 12,
//       stiffness: 200,
//     },
//   },
// }

export const MenuDropdown: React.FC<MenuDropdownProps> = ({}) => {
  const {
    modalState,
    position: { x },
    data,
    setModalState,
    setInterseting,
  } = useMegamenuDropownStore()
  const {
    navbarDimentions: { height },
  } = useGlobalStore()

  return (
    <Portal>
      <AnimatePresence>
        {modalState === 'visible' && (
          <motion.div
            initial={{ opacity: 0, x }}
            animate={{ opacity: 1, x }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'easeInOut' }}
            style={{ top: `${height + 20}px` }}
            className="fixed z-20 | w-[358px] | p-7 | border-gray/60 border | text-white | bg-[#0A0A0E]/90 backdrop-blur-3xl rounded-[8px] "
            onMouseLeave={() => {
              setInterseting(false)
              setModalState('hidden')
            }}
            onMouseEnter={() => setInterseting(true)}
          >
            <ul className="flex flex-col space-y-8 relative z-20">
              {data?.map(({ _key, description, image, title, ctaButton }) => (
                <motion.li
                  key={_key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex space-x-5 "
                >
                  <figure className="col-span-2 | flex justify-start items-start">
                    <SanityImg
                      className="object-contain w-[24px] h-[24px]"
                      width={30}
                      image={image}
                      builder={imageUrlBuilder}
                      alt={title}
                    />
                  </figure>
                  <section className="flex-1 | flex flex-col space-y-2">
                    <h6 className="text-body-3 uppercase">{title}</h6>
                    <span className="text-[#B6BEE8]">{description}</span>
                    {!!ctaButton && (
                      <Link href={ctaButton?.href ?? '/'}>
                        <a className="text-[#B37AF8] overflow-hidden | flex space-x-3">
                          {/* TODO animate the text */}
                          <span className="uppercase">{ctaButton.title}</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                          </svg>
                        </a>
                      </Link>
                    )}
                  </section>
                </motion.li>
              ))}
            </ul>
            <Pointer />
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  )
}

const Pointer: React.FC<{}> = () => {
  const { setInterseting } = useMegamenuDropownStore()

  return (
    <div
      onMouseEnter={() => setInterseting(true)}
      style={{ clipPath: `polygon(0 0, 100% 0, 100% 100%, 50% 50%)` }}
      className="absolute top-0 h-7 w-7 bg-[#0A0A0E] -translate-y-1/2 -rotate-45 border-gray/60 border-t border-r rounded"
    ></div>
  )
}
