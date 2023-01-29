import { MenuItem } from 'lib/@types/global-types'
import useGlobalStore from '../../store/global.store'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
import { useWindowSize } from 'lib/hooks'
import { useRouter } from 'next/router'
import clsx from 'clsx'

interface DropdownProps {
  menu: MenuItem[]
  darkBg: boolean
}

export const Dropdown: React.FC<DropdownProps> = ({ menu, darkBg }) => {
  const router = useRouter()
  const windowWidth = useWindowSize()?.width ?? 0
  const { showNavDropDown } = useGlobalStore()
  const [navbarHeight, setNavbarHeight] = useState(0)
  //   const highlightBtn = menu.filter((men) => men.highlight)[0]

  useEffect(() => {
    setNavbarHeight(document.querySelector('#navbar').clientHeight)
  }, [windowWidth])

  return (
    <AnimatePresence>
      {showNavDropDown && windowWidth < 1024 && (
        <motion.nav
          initial={{ y: '-120%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-120%', opacity: 0 }}
          transition={{ type: 'spring', damping: 30, mass: 0.4, stiffness: 300 }}
          style={{ top: `${navbarHeight}px` }}
          className={clsx(
            'z-30 fixed w-full | backdrop-blur-3xl',
            darkBg ? 'bg-black/90' : 'bg-secondary/5',
          )}
        >
          <ul className="flex flex-col space-y-4 container | justify-center items-center p-5">
            {menu
              .filter((men) => !men.highlight)
              .map(({ _key, title, pageUrl, externalUrl }) => (
                <li
                  key={_key}
                  className={clsx(
                    'relative text-body-3 font-semibold',
                    router.asPath === pageUrl
                      ? 'text-transparent bg-clip-text primary__gradient'
                      : 'text-white',
                  )}
                >
                  <Link href={pageUrl || externalUrl}>{title}</Link>
                  {router.asPath === pageUrl && (
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-[0.2em] left-0 absolute primary__gradient"
                    />
                  )}
                </li>
              ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
