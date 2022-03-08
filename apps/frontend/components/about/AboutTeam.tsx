import { TeamSection } from 'lib/aboutUsTypes'
import { ReactElement } from 'react'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

export default function AboutTeam(data: TeamSection): ReactElement {
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
      <div className="text-head-4 font-[275]">{data.headline}</div>
      <div className="grid md:grid-cols-12 grid-cols-6 gap-[30px] py-12">
        {data.members.map((team) => (
          <div className="col-span-3 flex flex-col items-center">
            <div>
              <SanityImg
                className="w-full h-full rounded-xl md:object-contain object-cover mb-5"
                builder={imageUrlBuilder}
                image={team.image}
                alt={team.image?.alt || 'image'}
                height={windowWidth >= 768 ? 320 : 160}
              />
            </div>
            <div className="md:text-[24px] md:leading-[34px] text-body-1">{team.name}</div>
            <div className="md:text-body-1 text-[14px] leading-[24px]">{team.position}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
