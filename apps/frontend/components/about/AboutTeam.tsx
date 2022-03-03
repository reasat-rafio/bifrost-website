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
    <div className="relative container py-32 flex flex-col items-center space-y-4">
      <div className="text-transparent bg-clip-text bifrost__gradient_green text-[18px] leading-[22.86px]">
        {data.subHeadline}
      </div>
      <div className="text-head-4 font-[275]">{data.headline}</div>
      <div className="grid grid-cols-12 gap-[30px] py-12">
        {data.members.map((team) => (
          <div className="col-span-3 flex flex-col items-center">
            <div>
              <SanityImg
                className="w-full h-full rounded-xl md:object-contain object-cover mb-5"
                builder={imageUrlBuilder}
                image={team.image}
                alt={team.image?.alt || 'image'}
                height={windowWidth >= 768 ? 1000 : 500}
              />
            </div>
            <div className="text-[24px] leading-[34px]">{team.name}</div>
            <div className="text-body-1">{team.position}</div>
          </div>
        ))}
      </div>
    </div>
  )
}