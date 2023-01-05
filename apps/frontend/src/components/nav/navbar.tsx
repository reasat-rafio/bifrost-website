import { imageUrlBuilder } from 'src/utils/sanity'
import clsx from 'clsx'
import { useWindowScroll, useWindowSizeEffect } from 'src/lib/hooks'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import { motion } from 'framer-motion'
import { MenuItem } from 'lib/@types/global-types'
import Link from 'next/link'
import { Button } from '../ui/button'
import useGlobalStore from '../../store/global.store'

interface NavbarProps {
  logo: SanityImage
  darkLogo: SanityImage
  menu: MenuItem[]
  darkBg?: boolean
}

export default function Navbar({ logo, menu, darkBg }: NavbarProps): ReactElement {
  const router = useRouter()
  const { showNavDropDown, setShowNavDropDown } = useGlobalStore()
  const highlightBtn = menu.filter((men) => men.highlight)[0]
  const [smallNav, setSmallNav] = useState(false)
  const scroll = useWindowScroll()?.y ?? 0

  useWindowSizeEffect(
    (w, _) => {
      if (!smallNav) {
        setShowNavDropDown(false)
      }
      setSmallNav(w < 1024)
    },
    [setShowNavDropDown],
  )

  return (
    <nav
      id="navbar"
      className={clsx(
        'fixed top-0 left-0 z-40 | w-full',
        scroll
          ? smallNav
            ? darkBg
              ? 'bg-black/90 backdrop-blur-3xl'
              : 'backdrop-blur-3xl bg-secondary/5'
            : ''
          : 'shadow',
        smallNav && darkBg
          ? 'bg-black/90 backdrop-blur-3xl'
          : `backdrop-blur-3xl ${darkBg ? 'bg-black/90' : 'bg-secondary/5'}`,
        showNavDropDown && 'backdrop-blur-3xl bg-secondary/5',
      )}
    >
      <div className={clsx('container')}>
        <motion.div
          initial={{ padding: '14px 0' }}
          animate={{ padding: scroll ? `10px 0` : `14px 0` }}
          transition={{ type: 'spring', duration: 0.4 }}
          className=" container w-full mx-auto | flex justify-between items-center | space-x-5"
        >
          <motion.figure
            initial={{ scale: 1 }}
            animate={{ scale: scroll ? 0.8 : 1, originX: 0 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="2xl:h-16 xl:h-14 h-12"
          >
            <Link href={'/'} passHref>
              <SanityImg
                builder={imageUrlBuilder}
                image={logo}
                height={120}
                className={clsx('transition-all w-full h-full object-contain cursor-pointer')}
              />
            </Link>
          </motion.figure>
          <motion.ul
            initial={{ display: 'flex' }}
            animate={{ display: smallNav ? 'none' : 'flex' }}
            transition={{ delay: smallNav ? 0.4 : 0 }}
            className="flex-1 | justify-center items-center xl:space-x-10 space-x-7"
          >
            {menu
              .filter((men) => !men.highlight)
              .map(({ _key, title, pageUrl, externalUrl }) => (
                <motion.li
                  key={_key}
                  initial={{ y: 0 }}
                  animate={{ y: smallNav ? '-300%' : 0 }}
                  transition={{ duration: 0.4, type: 'tween', ease: 'backInOut' }}
                  className={clsx(
                    'relative xl:text-body-3 text-body-1-mobile font-semibold',
                    router.asPath === pageUrl
                      ? 'text-transparent bg-clip-text gradient__white__to__green'
                      : 'text-white',
                  )}
                >
                  <Link href={pageUrl || externalUrl}>{title}</Link>
                  {router.asPath === pageUrl && (
                    <motion.div
                      layout
                      className="w-[60%] h-[0.2em] left-0 absolute gradient__white__to__green"
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
              <Button type="href" href={highlightBtn.externalUrl || highlightBtn.pageUrl}>
                {highlightBtn.title}
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </nav>
  )
}
