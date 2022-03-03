import { ClientsSection } from 'lib/aboutUsTypes'
import { ReactElement } from 'react'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

export default function AboutClients(data: ClientsSection): ReactElement {
  console.log({ data })
  const { width: windowWidth } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  return (
    <div className="relative container py-32 flex flex-col items-center space-y-4 text-center">
      <div className="text-transparent bg-clip-text bifrost__gradient_green text-[18px] leading-[22.86px]">
        {data.subHeadline}
      </div>
      <div className="md:text-head-4 text-[38px] leading-[38px] font-[275]">{data.headline}</div>
      <div className="grid grid-cols-12 gap-x-[50px] gap-y-28 py-12">
        {data.clients.map((team) => (
          <div className="col-span-2 flex flex-col items-center justify-center">
            <div className="w-[70%]">
              <SanityImg
                className="w-full h-full md:object-contain object-cover"
                builder={imageUrlBuilder}
                image={team.logo}
                alt={team.logo?.alt || 'image'}
                height={windowWidth >= 768 ? 120 : 70}
              />
            </div>
          </div>
        ))}
        {data.clients.reverse().map((team) => (
          <div className="col-span-2 flex flex-col items-center justify-center">
            <div className="w-[70%]">
              <SanityImg
                className="w-full h-full md:object-contain object-cover"
                builder={imageUrlBuilder}
                image={team.logo}
                alt={team.logo?.alt || 'image'}
                height={windowWidth >= 768 ? 120 : 70}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
