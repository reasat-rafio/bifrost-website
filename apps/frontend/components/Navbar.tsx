import { imageUrlBuilder } from 'utils/sanity'
import clsx from 'clsx'
import { useWindowScroll, useWindowSizeEffect } from 'lib/hooks'
import { useRouter } from 'next/router'
import { ReactElement, useCallback, useRef, useState } from 'react'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import Link from 'next/link'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import Button from './ui/Button'
import { MenuItem } from 'lib/types'

interface NavbarProps {
  logo: SanityImage
  darkLogo: SanityImage
  menu: MenuItem[]
  activeSection: {
    hero?: boolean
    datasets?: boolean
  }
}

export default function Navbar({ logo, menu, activeSection }: NavbarProps): ReactElement {
  let activeName: string = Object.entries(activeSection).sort(
    ([_s1, r1]: [string, any], [_s2, r2]: [string, any]) => r2 - r1,
  )[0]?.[0]
  activeName = activeName === 'hero' || 'demo' ? 'home' : activeName
  const router = useRouter()
  const ctaButton = menu.filter((men) => men.isCTA)[0]
  const [smallNavOpen, setSmallNavOpen] = useState<boolean>(false)
  const [smallNav, setSmallNav] = useState<boolean>(false)
  const [isActive, setIsActive] = useState(false)
  const scroll = useWindowScroll()?.y ?? 0

  const navVisible = !smallNav || smallNavOpen
  const closeNav = useCallback(() => {
    if (smallNavOpen) {
      setSmallNavOpen(false)
      // unlockBody();
    }
  }, [smallNavOpen])
  const menuRef = useRef<HTMLDivElement>(null)

  useWindowSizeEffect(
    (w, _) => {
      if (!smallNav) {
        closeNav()
      }
      setSmallNav(w < 1280)
    },
    [closeNav],
  )

  console.log({ smallNavOpen, smallNav, navVisible })

  return (
    <motion.div
      animate={{
        color: '#fff',
        transition: { ease: 'easeInOut', duration: 0.3 },
      }}
      className={clsx(
        'fixed w-full py-4 z-50 top-0 transition-all duration-300 ease-out',
        navVisible || scroll ? 'backdrop-blur-2xl' : 'bg-transparent',
      )}
    >
      <nav className="lg:container flex flex-wrap justify-between items-center">
        <div className="w-full relative flex justify-between items-center lg:w-auto lg:static lg:block lg:justify-start">
          <a
            href="/#hero"
            onClick={(ev) => {
              if (router.pathname == '/') {
                ev.preventDefault()
                document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            <SanityImg
              builder={imageUrlBuilder}
              image={logo}
              height={120}
              className={clsx('transition-all w-auto', scroll ? 'h-10' : 'h-16')}
            />
          </a>
          <button
            className="rounded-full p-3 z-10 lg:hidden"
            type="button"
            onClick={(e) => {
              console.log('TEST', { smallNavOpen })
              e.preventDefault()
              console.log({ smallNavOpen })
              setSmallNavOpen(!smallNavOpen)
            }}
          >
            <img width={20} height={12} src="burger.svg" alt="Menu" />
            {/* <object type="image/svg+xml" height="22" width="22" data="burger.svg" /> */}
          </button>
        </div>
        <AnimatePresence initial={false}>
          {navVisible && (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              className={clsx('backdrop-blur-3xl', smallNavOpen && 'w-full')}
              variants={{
                initial: {
                  opacity: 0,
                },
                animate: {
                  opacity: 1,
                },
                exit: {
                  opacity: 0,
                },
              }}
              onClick={(ev) => {
                if (ev.clientY > (menuRef.current?.clientHeight ?? 0)) {
                  closeNav()
                }
              }}
            >
              <motion.nav
                // className={clsx(_tyles.menu)}
                variants={{
                  initial: {
                    y: '-100%',
                  },
                  animate: {
                    y: 0,
                    transition: {
                      duration: 2,
                      type: 'spring',
                      mass: 0.5,
                      damping: 10,
                    },
                  },
                  exit: {
                    y: '-100%',
                    transition: {
                      duration: 0.5,
                    },
                  },
                }}
                ref={menuRef}
              >
                <AnimateSharedLayout>
                  <ul className="flex flex-col lg:flex-row items-center list-none lg:ml-auto mt-4 md:mt-0">
                    {menu
                      .filter((men) => !men.isCTA)
                      .map((men, _) => (
                        <li
                          key={men.title}
                          className="dropdown relative items-center mx-10 py-2 my-2 "
                        >
                          <Link href={men.href}>
                            <a
                              onClick={(ev) => {
                                if (men.submenu && men.submenu?.length > 0) {
                                  ev.preventDefault()
                                  setIsActive(!isActive)
                                }
                              }}
                              className={clsx(
                                'lg:my-0 flex items-center md:items-center font-bold hover:opacity-75 ',
                                men.isCTA && 'cta-button font-bold',
                              )}
                            >
                              <span
                                className={clsx(
                                  activeName === men.title.toLowerCase() &&
                                    'text-transparent bg-clip-text ',
                                  activeName === men.title.toLowerCase() &&
                                    'bifrost__gradient_green',
                                )}
                              >
                                {men.title}
                              </span>
                            </a>
                          </Link>
                          {activeName === men?.title.toLowerCase() && (
                            <motion.div
                              layout
                              className={clsx(
                                'w-[60%] h-[0.2em] left-0 absolute bottom-[-4px]',
                                activeName === men.title.toLowerCase() && 'bifrost__gradient_green',
                              )}
                              layoutId="underline"
                              initial={false}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </li>
                      ))}
                  </ul>
                </AnimateSharedLayout>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
        {/* <div */}
        {/*   className={clsx('lg:flex  justify-center items-center', !navVisible ? 'flex' : 'hidden')} */}
        {/* > */}
        {/*   <ul className="flex flex-col lg:flex-row items-center list-none lg:ml-auto mt-4 md:mt-0"> */}
        {/*     {menu */}
        {/*       .filter((men) => !men.isCTA) */}
        {/*       .map((men) => ( */}
        {/*         <li key={men.title} className="dropdown relative items-center mx-10 py-2 my-2 "> */}
        {/*           <Link href={men.href}> */}
        {/*             <a */}
        {/*               onClick={(ev) => { */}
        {/*                 if (men.submenu && men.submenu?.length > 0) { */}
        {/*                   ev.preventDefault() */}
        {/*                   setIsActive(!isActive) */}
        {/*                 } */}
        {/*               }} */}
        {/*               className={clsx( */}
        {/*                 'lg:my-0 flex items-center md:items-center font-bold hover:opacity-75 ', */}
        {/*                 men.isCTA && 'cta-button font-bold', */}
        {/*               )} */}
        {/*             > */}
        {/*               <span */}
        {/*                 className={clsx( */}
        {/*                   activeName === men.title.toLowerCase() && */}
        {/*                     'text-transparent bg-clip-text ', */}
        {/*                   activeName === men.title.toLowerCase() && 'bifrost__gradient_green', */}
        {/*                 )} */}
        {/*               > */}
        {/*                 {men.title} */}
        {/*               </span> */}
        {/*             </a> */}
        {/*           </Link> */}
        {/*           {activeName === men?.title.toLowerCase() && ( */}
        {/*             <motion.div */}
        {/*               layout */}
        {/*               className={clsx( */}
        {/*                 'w-[60%] h-[0.2em] left-0 absolute bottom-[-4px]', */}
        {/*                 activeName === men.title.toLowerCase() && 'bifrost__gradient_green', */}
        {/*               )} */}
        {/*               layoutId="underline" */}
        {/*               initial={false} */}
        {/*               transition={{ duration: 0.2 }} */}
        {/*             /> */}
        {/*           )} */}
        {/*         </li> */}
        {/*       ))} */}
        {/*   </ul> */}
        {/* </div> */}
        <div className={clsx('lg:flex justify-center', !smallNav ? 'flex' : 'hidden')}>
          <Button>
            <Link href={ctaButton.href}>
              <a>{ctaButton.title}</a>
            </Link>
          </Button>
        </div>
      </nav>
    </motion.div>
  )
}
