import { ReactElement } from 'react'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import { Footer as FooterType, SocialType } from 'src/lib/@types/types'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { imageUrlBuilder } from 'src/utils/sanity'
import Button from './ui/_Button'
import Link from 'next/link'

interface FooterProps {
  logo: SanityImage
  footer: FooterType
}

function socialIcon(type: SocialType) {
  switch (type) {
    case 'facebook':
      return '/footer/facebook.svg'
    case 'instagram':
      return '/footer/instagram.svg'
    case 'linkedin':
      return '/footer/linkedin.svg'
    default:
      return '/footer/facebook.svg'
  }
}

export default function Footer({ logo, footer }: FooterProps): ReactElement {
  const router = useRouter()
  return (
    <div className={clsx('backdrop-blur-2xl')}>
      <div
        className={clsx(
          'container grid grid-cols-3 md:gap-y-0 gap-y-5 justify-between z-10 relative gap-x-10 py-10',
          'text-white',
          'backdrop-blur-2xl',
        )}
      >
        <div className="md:col-span-1 col-span-3 flex flex-col md:gap-y-9 gap-y-3">
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
              width={180}
              className={clsx('transition-all w-auto h-10')}
            />
          </a>
          <div className="flex gap-x-5">
            {footer.socialButtons?.map((item) => (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                key={item.title}
                className="cursor-pointer"
              >
                <div className="gradient__white__to__green rounded-full p-[1px]">
                  <div className="bg-black text-white rounded-full p-3">
                    <object
                      type="image/svg+xml"
                      height="12"
                      width="12"
                      data={socialIcon(item.type)}
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="md:block hidden">{footer.copyright}</div>
        </div>
        <hr className="md:hidden w-full col-span-3" />
        <div className="md:col-span-1 col-span-3 flex flex-col md:gap-y-9 gap-y-3">
          <div className="font-bold">Quick Links</div>
          <div className="grid md:grid-cols-2 grid-cols-1  gap-y-5">
            {footer.menu?.map((menu) => (
              <Link key={menu.title} href={menu.href ?? ''}>
                <a className="cursor-pointer opacity-[0.7]">{menu.title}</a>
              </Link>
            ))}
          </div>
        </div>
        <hr className="md:hidden w-full col-span-3" />
        <div className="md:col-span-1 col-span-3 flex flex-col gap-y-9">
          <div className="font-bold">Sign up for API access</div>

          <div className="opacity-70">
            Get in touch with us and learn how you can supercharge your AI development today!
          </div>
          <div className="flex items-center justify-self">
            <div className="relative w-full">
              <input
                className="shadow md:text-base text-sm w-full input__dark rounded-lg appearance-none py-6 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="email"
                placeholder="Enter your Email Address"
              />
              <div className="absolute top-[15%] right-2">
                <Button>
                  <a href="#send">Send</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden col-span-3 w-full">{footer.copyright}</div>
      </div>
    </div>
  )
}
