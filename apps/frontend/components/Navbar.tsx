import { imageUrlBuilder } from 'utils/sanity'
import clsx from 'clsx'
import { useWindowScroll } from 'lib/hooks'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from './ui/Button'
import { useCtx } from 'contexts/global'
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

export default function Navbar({ logo, darkLogo, menu, activeSection }: NavbarProps): ReactElement {
  let activeName: string = Object.entries(activeSection).sort(
    ([_s1, r1]: [string, any], [_s2, r2]: [string, any]) => r2 - r1,
  )[0]?.[0]
  activeName = activeName === 'hero' || 'demo' ? 'home' : activeName
  const ctaButton = menu.filter((men) => men.isCTA)[0]
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const scroll = useWindowScroll()?.y ?? 0
  const router = useRouter()
  const { isWhite } = useCtx()

  return (
    <motion.div
      animate={{
        color: isWhite ? '#000' : '#fff',
        backgroundColor: isWhite ? '#fff' : '#000',
        transition: { ease: 'easeInOut', duration: 0.3 },
      }}
      className={clsx(
        'fixed w-full py-4 z-50 top-0 transition-all duration-300 ease-out',
        navbarOpen || scroll ? 'shadow-md' : 'bg-transparent',
      )}
    >
      <nav className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <a
            href="/#hero"
            onClick={(ev) => {
              if (router.pathname == '/') {
                ev.preventDefault()
                document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            {/* {isWhite ? ( */}
            {/*   <SanityImg */}
            {/*     builder={imageUrlBuilder} */}
            {/*     image={darkLogo} */}
            {/*     height={120} */}
            {/*     className={clsx('transition-all w-auto', scroll ? 'h-10' : 'h-16')} */}
            {/*   /> */}
            {/* ) : ( */}
            <SanityImg
              builder={imageUrlBuilder}
              image={logo}
              height={120}
              className={clsx('transition-all w-auto', scroll ? 'h-10' : 'h-16')}
            />
            {/* )} */}
          </a>
          <button
            className="lg:hidden outline-none focus:outline-none"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <img src="burger.svg" width={25} height={25} />
          </button>
        </div>
        <div
          className={clsx('lg:flex  justify-center items-center', navbarOpen ? 'flex' : 'hidden')}
        >
          <ul className="flex flex-col lg:flex-row items-center list-none lg:ml-auto mt-4 md:mt-0">
            {menu
              .filter((men) => !men.isCTA)
              .map((men) => (
                <li key={men.title} className="dropdown relative items-center mx-10 py-2 my-2 ">
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
                            (isWhite ? 'text-neonBlue' : 'bifrost__gradient_green'),
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
                        activeName === men.title.toLowerCase() &&
                          (isWhite ? 'bg-neonBlue' : 'bifrost__gradient_green'),
                      )}
                      layoutId="underline"
                      initial={false}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </li>
              ))}
          </ul>
        </div>
        <div className={clsx('lg:flex justify-center', navbarOpen ? 'flex' : 'hidden')}>
          <Button _outlined={true}>
            <Link href={ctaButton.href}>
              <a>{ctaButton.title}</a>
            </Link>
          </Button>
        </div>
      </nav>
    </motion.div>
  )
}
