import { ReactElement } from 'react'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import { Footer as FooterType } from 'src/lib/@types/types'
import { imageUrlBuilder } from 'src/utils/sanity'
import Link from 'next/link'
import { useWindowSize } from 'lib/hooks'
import { Button } from './ui/button'

interface FooterProps {
  logo: SanityImage
  footer: FooterType
}

export default function Footer({
  logo,
  footer: { copyright, menu, socialButtons, newsletter },
}: FooterProps): ReactElement {
  const windowWidth = useWindowSize()?.width ?? 0
  return (
    <footer className="bg-black z-10 relative">
      <div className="relative container z-10 | grid grid-cols-12 | xl:gap-y-0 gap-y-5 md:gap-x-10 py-10 | text-white">
        <section className="xl:col-span-4 col-span-12 flex flex-col | md:gap-y-9 gap-y-3">
          <Link href="/">
            <a>
              <SanityImg
                className="transition-all w-auto h-12"
                builder={imageUrlBuilder}
                image={logo}
                width={windowWidth >= 768 ? 180 : 90}
                alt="Bifrost Logo"
              />
            </a>
          </Link>
          <div className="flex gap-x-5">
            {socialButtons?.map((item) => (
              <Link key={item._id} href={item.url}>
                <a className="gradient__white__to__green rounded-full p-[1px]">
                  <figure className="bg-black text-white rounded-full p-3 overflow-hidden">
                    <SanityImg
                      className="sm:h-[15px] sm:w-[15px] h-[13px] w-[13px]"
                      builder={imageUrlBuilder}
                      image={item.icon}
                      width={windowWidth >= 768 ? 24 : 20}
                      alt={item.url}
                    />
                  </figure>
                </a>
              </Link>
            ))}
          </div>
          <span className="xl:block hidden | text-lg opacity-70">{copyright}</span>
        </section>
        <hr className="md:hidden col-span-12" />
        <section className="xl:col-span-4 md:col-span-6 col-span-12 flex flex-col md:gap-y-9 gap-y-3">
          <h6 className="font-semibold text-[20px]">Quick Links</h6>
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-y-5 gap-y-2">
            {menu?.map((menu) => (
              <Link key={menu._key} href={menu.pageUrl || menu.externalUrl}>
                <a className="opacity-70 hover:opacity-100 transition-opacity | text-lg">
                  {menu.title}
                </a>
              </Link>
            ))}
          </div>
        </section>
        <hr className="md:hidden col-span-12" />
        <section className="xl:col-span-4 md:col-span-6 col-span-12 flex flex-col gap-y-9">
          <h6 className="font-semibold text-[20px]">{newsletter.title}</h6>
          <p className="opacity-70 text-lg">{newsletter.subtitle}</p>
          <div className="flex items-center justify-self">
            <div className="w-full relative flex">
              <input
                autoComplete="off"
                className="w-full | md:py-6 py-4 px-5 | text-body-3 text-gray-700 leading-tight | rounded-[15px] | appearance-none focus:outline-none focus:shadow-outline shadow | input__dark "
                id="username"
                type="email"
                placeholder="Enter your email address"
              />

              <div className="z-10 absolute right-3 top-1/2 -translate-y-1/2">
                <Button variant="primary" type="href" href={newsletter.ctaButton?.href ?? ''}>
                  {newsletter.ctaButton.title}
                </Button>
              </div>
            </div>
          </div>
        </section>
        <span className="xl:hidden col-span-12">{copyright}</span>
      </div>
    </footer>
  )
}
