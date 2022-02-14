import { ReactElement } from 'react'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import { Footer as FooterType, SocialType } from 'lib/types'
import { useCtx } from 'contexts/global'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { imageUrlBuilder } from 'utils/sanity'
import Button from './ui/Button'

interface FooterProps {
  logo: SanityImage
  footer: FooterType
}

function socialIcon(type: SocialType) {
  switch (type) {
    case 'facebook':
      return 'footer/facebook.svg'
    case 'instagram':
      return 'footer/instagram.svg'
    case 'linkedin':
      return 'footer/linkedin.svg'
    case 'instagram':
      return ''
  }
}

export default function Footer(data: FooterProps): ReactElement {
  const { isWhite } = useCtx()
  const router = useRouter()
  console.log({ data })
  return (
    <div
      className={clsx(
        'container grid grid-cols-3 justify-between z-10 relative gap-x-10 py-10',
        isWhite ? 'text-black' : 'text-white',
      )}
    >
      <div className="flex flex-col gap-y-9">
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
            image={data.logo}
            height={120}
            className={clsx('transition-all w-auto h-10')}
          />
        </a>
        <div className="flex gap-x-5">
          {data.footer.socialButtons?.map((item) => (
            <a href={item.url} target="_blank" rel="noopener noreferrer" key={item.title}>
              <div className="bifrost__gradient_green rounded-full p-[1px]">
                <div className=" bg-white rounded-full">
                  <img className="p-3 w-[44px] h-[44px]" src={socialIcon(item.type)} />
                </div>
              </div>
            </a>
          ))}
        </div>
        <div>{data.footer.copyright}</div>
      </div>
      <div className="flex flex-col gap-y-9">
        <div className="font-bold">Quick Links</div>
        <div className="grid grid-cols-2 gap-y-9">
          {data.footer.menu?.map((menu) => (
            <div key={menu.title}>{menu.title}</div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-y-9">
        <div className="font-bold">Sign up for API access</div>

        <div>Get in touch with us and learn how you can supercharge your AI development today!</div>
        <div className="flex items-center justify-self">
          <div className="relative w-full">
            <input
              className="shadow w-full input__dark rounded-lg appearance-none py-6 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="email"
              placeholder="Enter your Email Address"
            />
            <div className="absolute lg:top-[15%] right-2">
              <Button _outlined={true}>
                <a href="#send">Send</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
