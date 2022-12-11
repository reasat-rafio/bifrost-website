import { imageUrlBuilder } from 'src/utils/sanity'
import clsx from 'clsx'
import { useWindowScroll, useWindowSizeEffect } from 'src/lib/hooks'
import { useRouter } from 'next/router'
import { ReactElement, useCallback, useRef, useState } from 'react'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import { AnimatePresence, motion } from 'framer-motion'
import Button from './ui/_Button'
import { MenuItem } from 'src/lib/@types/types'

interface NavbarProps {
  logo: SanityImage
  darkLogo: SanityImage
  menu: MenuItem[]
  darkBg?: boolean
}

export default function Navbar({ logo, menu, darkBg }: NavbarProps): ReactElement {
  const router = useRouter()
  const ctaButton = menu.filter((men) => men.isCTA)[0]
  const [smallNavOpen, setSmallNavOpen] = useState<boolean>(false)
  const [smallNav, setSmallNav] = useState<boolean>(false)
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
      setSmallNav(w < 1024)
    },
    [closeNav],
  )

  return (
    <motion.div
      animate={{
        color: '#fff',
        transition: { ease: 'easeInOut', duration: 0.3 },
      }}
      className={clsx(
        'fixed w-full py-4 z-50 top-0 transition-all duration-300 ease-out',
        // @TODO chage thee opacity
        darkBg
          ? navVisible || scroll
            ? 'bg-black'
            : 'bg-black'
          : navVisible || scroll
          ? 'backdrop-blur-2xl'
          : 'bg-transparent',
      )}
    >
      <nav className="lg:container flex flex-wrap justify-between items-center">
        <div
          className="w-full relative flex justify-between items-center lg:w-auto lg:static lg:block lg:justify-start"
          id="navbar"
        >
          <a
            href="/"
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
            <img width={20} height={12} src="/burger.svg" alt="Menu" />
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
                <motion.ul
                  className="flex flex-col lg:flex-row items-center list-none lg:ml-auto mt-4 md:mt-0"
                  layout
                >
                  {menu
                    .filter((men) => !men.isCTA)
                    .map((men, _) => (
                      <li
                        key={men.title}
                        className="dropdown relative items-center mx-10 py-2 my-2 "
                      >
                        <a
                          onClick={(ev) => {
                            if (men.url) {
                              ev.preventDefault()
                              if (typeof window !== 'undefined') window.open(men.url, '_blank')
                            } else {
                              router.push(men.href)
                            }
                            if (men.submenu && men.submenu?.length > 0) {
                              ev.preventDefault()
                            }
                          }}
                          className={clsx(
                            'lg:my-0 flex items-center md:items-center font-bold hover:opacity-75 cursor-pointer',
                            men.isCTA && 'cta-button font-bold',
                          )}
                        >
                          <span
                            className={clsx(
                              router.asPath === men.href &&
                                'text-transparent bg-clip-text gradient__white__to__green',
                            )}
                          >
                            {men.title}
                          </span>
                        </a>
                        {router.asPath === men?.href && (
                          <motion.div
                            layout
                            className={clsx(
                              'w-[60%] h-[0.2em] left-0 absolute bottom-[-4px] gradient__white__to__green',
                            )}
                            layoutId="underline"
                            initial={false}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </li>
                    ))}
                </motion.ul>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
        <div className={clsx('lg:flex justify-center', !smallNav ? 'flex' : 'hidden')}>
          <Button onClick={() => router.push(ctaButton.href)}>
            <a onClick={(e) => e.preventDefault()}>{ctaButton.title}</a>
          </Button>
        </div>
      </nav>
    </motion.div>
  )
}
