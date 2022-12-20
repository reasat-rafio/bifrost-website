import { GradientTitle } from 'src/components/common/GradientTitle'
import { Header } from 'src/components/ui/Header'
import { TeamSection } from 'src/lib/@types/aboutUsTypes'
import { ReactElement } from 'react'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'src/utils/sanity'

export default function Team({ headline, members, subHeadline }: TeamSection): ReactElement {
  const { width: windowWidth } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  return (
    <section className="container text-center z-30 relative xl:mb-36 lg:mb-20 mb-16">
      <header className="max-w-2xl mx-auto">
        <GradientTitle className="mx-auto">{subHeadline}</GradientTitle>
        <Header>{headline}</Header>
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 py-5">
        {members.map((team) => (
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
