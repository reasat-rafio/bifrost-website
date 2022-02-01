import { imageUrlBuilder } from 'utils/sanity'
import clsx from 'clsx'
import { useWindowScroll } from 'lib/hooks'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface NavbarProps {
  logo: SanityImage
  menu: MenuItem[]
  activeSection: {
    home?: boolean
  }
}

export default function Navbar({ logo, menu, activeSection }: NavbarProps): ReactElement {
  const activeName: string = Object.entries(activeSection).sort(
    ([_s1, r1]: [string, any], [_s2, r2]: [string, any]) => r2 - r1,
  )[0]?.[0]
  const ctaButton = menu.filter((men) => men.isCTA)[0]
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const scroll = useWindowScroll()?.y ?? 0
  const router = useRouter()
  console.log('logo', { logo })

  return (
    <div
      className={clsx(
        'fixed w-full py-4 z-50 top-0 transition-all duration-300 ease-out',
        navbarOpen || scroll ? 'shadow-md' : 'bg-transparent',
      )}
    >
      <nav className="container mx-auto flex flex-wrap justify-between items-center text-white">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <a
            href="/#home"
            onClick={(ev) => {
              if (router.pathname == '/') {
                ev.preventDefault()
                document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' })
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
                        'lg:my-0 flex items-center md:items-center font-bold text-dark hover:opacity-759 ',
                        men.isCTA && 'cta-button font-bold',
                      )}
                    >
                      <span
                        className={clsx(
                          activeName === men.title.toLowerCase() &&
                            'text-transparent bg-clip-text bifrost__gradient_green',
                        )}
                      >
                        {men.title}
                      </span>
                      {/* {men.submenu && men.submenu?.length > 0 && ( */}
                      {/*   <img */}
                      {/*     className={clsx( */}
                      {/*       !isActive ? 'rotate-0' : '-rotate-180', */}
                      {/*       'transform ml-1 w-3 lg:hidden absolute left-16 transition-transform delay-100', */}
                      {/*     )} */}
                      {/*     src="/downTriangle.svg" */}
                      {/*   /> */}
                      {/* )} */}
                    </a>
                  </Link>
                  {/* {activeName} */}
                  {/* {men.title.toLowerCase()} */}
                  {/* {activeName === men.title.toLowerCase() ? 'test' : 'test1'} */}
                  {activeName === men?.title.toLowerCase() && (
                    <motion.div
                      layout
                      className="w-[60%] h-[0.2em] left-0 absolute bottom-[-4px] bifrost__gradient_green"
                      layoutId="underline"
                      initial={false}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  {/* {men.submenu?.length > 0 && ( */}
                  {/*   <div */}
                  {/*     className={clsx( */}
                  {/*       !isActive ? 'drop-down-inactive' : 'drop-down-active', */}
                  {/*       'lg:opacity-0 lg:ml-10 lg:block menu-wrapper lg:absolute transition duration-300', */}
                  {/*     )} */}
                  {/*   > */}
                  {/*     <ul className="flex-row lg:w-32  text-center lg:text-left ease-in-out lg:py-2 lg:pl-7 lg:bg-white lg:shadow-lg lg:rounded-lg"> */}
                  {/*       <div> */}
                  {/*         {men.submenu.map((item: any) => ( */}
                  {/*           <li */}
                  {/*             key={item.title} */}
                  {/*             className={'text-dark my-3 hover:opacity-75 font-medium'} */}
                  {/*           > */}
                  {/*             <Link href={item.href}> */}
                  {/*               <a>{item.title}</a> */}
                  {/*             </Link> */}
                  {/*           </li> */}
                  {/*         ))} */}
                  {/*       </div> */}
                  {/*     </ul> */}
                  {/*   </div> */}
                  {/* )} */}
                </li>
              ))}
          </ul>
        </div>
        <div className={clsx('lg:flex justify-center', navbarOpen ? 'flex' : 'hidden')}>
          <div className="rounded-md p-[0.5px] bifrost__gradient_green">
            <div className="flex flex-col justify-between h-full bifrost__gradient_dark_blue text-white rounded-md py-2 px-10">
              <Link href={ctaButton.href}>
                <a>{ctaButton.title}</a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
