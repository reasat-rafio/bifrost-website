import { ReactElement } from 'react'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import { Footer as FooterType } from 'src/lib/@types/types'
import clsx from 'clsx'
import { useRouter } from 'next/router'
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
  const router = useRouter()
  const windowWidth = useWindowSize()?.width ?? 0
  return (
    <div className={clsx('bg-black z-10 relative')}>
      <div className="relative container z-10 | grid md:grid-cols-3 grid-cols-1 justify-between | md:gap-y-0 gap-y-5 gap-x-10 py-10 |text-white">
        <div className="flex flex-col | md:gap-y-9 gap-y-3">
          <Link href="/">
            <a>
              <SanityImg
                className="transition-all w-auto h-10"
                builder={imageUrlBuilder}
                image={logo}
                width={windowWidth >= 768 ? 180 : 90}
                alt="Bifrost Logo"
              />
            </a>
          </Link>
          <div className="flex gap-x-5">
            {socialButtons?.map((item) => (
              <Link key={item._key} href={item.url}>
                <a className="gradient__white__to__green rounded-full p-[1px]">
                  <figure className="bg-black text-white rounded-full p-3">
                    <SanityImg
                      className="h-[15px] w-[15px]"
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
          <div className="md:block hidden | text-lg opacity-70">{copyright}</div>
        </div>
        <hr className="md:hidden w-full" />
        <div className="flex flex-col md:gap-y-9 gap-y-3">
          <h6 className="font-semibold text-[20px]">Quick Links</h6>
          <div className="grid md:grid-cols-2 grid-cols-1  gap-y-5">
            {menu?.map((menu) => (
              <Link key={menu._key} href={menu.pageUrl || menu.externalUrl}>
                <a className="opacity-70 hover:opacity-100 transition-opacity | text-lg">
                  {menu.title}
                </a>
              </Link>
            ))}
          </div>
        </div>
        <hr className="md:hidden w-full" />
        <div className="flex flex-col gap-y-9">
          <h6 className="font-semibold text-[20px]">{newsletter.title}</h6>
          <p className="opacity-70 text-lg">{newsletter.subtitle}</p>
          <div className="flex items-center justify-self">
            <div className="relative w-full">
              <input
                className="shadow md:text-base text-sm w-full input__dark rounded-lg appearance-none py-6 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="email"
                placeholder="Enter your Email Address"
              />
              <div className="absolute top-[15%] right-2">
                <Button type="href" href={newsletter.ctaButton?.href ?? '/'}>
                  {newsletter.ctaButton.title}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden col-span-3 w-full">{copyright}</div>
      </div>
    </div>
  )
}
