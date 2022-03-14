import { TeamSection } from 'lib/aboutUsTypes'
import { ReactElement } from 'react'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

export default function AboutTeam(data: TeamSection): ReactElement {
  const { width: windowWidth } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  return (
    <section className="container text-center z-30 relative xl:mb-36 lg:mb-20 mb-16">
      <div className="max-w-2xl mx-auto">
        <h6 className="text-transparent bg-clip-text bifrost__gradient_green text-[18px] leading-[22.86px]">
          {data.subHeadline}
        </h6>
        <h4 className="md:text-head-4 text-[38px] leading-[38px] font-[275] my-5">
          {data.headline}
        </h4>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 py-5">
        {data.members.map((team) => (
          <div className="flex flex-col items-center space-y-1">
            <div>
              <SanityImg
                className="w-full h-full rounded-xl md:object-contain object-cover mb-5"
                builder={imageUrlBuilder}
                image={team.image}
                alt={team.image?.alt || 'image'}
                height={windowWidth >= 768 ? 320 : 160}
              />
            </div>
            <span className="md:text-[24px] text-body-1">{team.name}</span>
            <span className="md:text-body-1 text-[14px] ">{team.position}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
