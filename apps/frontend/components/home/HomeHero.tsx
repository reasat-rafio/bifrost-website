import clsx from 'clsx'
import Button from 'components/ui/Button'
import { useCtx } from 'contexts/global'
import { marksSerializer, typesSerializer } from 'lib/blockContent'
import { showHero } from 'lib/showHero'
import { HeroData, HomeSection } from 'lib/types'
import { ReactElement } from 'react'
import { PortableText } from 'utils/sanity'

export default function HomeHero(data: HomeSection): ReactElement {
  const heroData: HeroData = { type: 'image', image: data.image }

  const { isWhite } = useCtx()

  console.log({ heroData })

  return (
    <div>
      <div
        className={clsx(
          'container flex flex-col-reverse md:flex-row z-10 md:space-x-12 md:space-y-0 relative h-[100vh]',
          isWhite ? 'text-black' : 'text-white',
        )}
      >
        <div className="flex flex-col items-center md:items-start md:flex-1 space-y-10 self-center">
          <div>
            <h1 className="text-head-1">{data.headline}</h1>
            <h2 className="text-head-1 text-transparent bg-clip-text bifrost__gradient_green">
              {data.subHeadline}
            </h2>
          </div>
          <div className="text-head-3">
            <PortableText
              blocks={data.body}
              serializers={{
                types: typesSerializer,
                marks: marksSerializer,
              }}
            />
          </div>
          <Button>
            <a href={data.ctaButton.href}>{data.ctaButton.title}</a>
          </Button>
        </div>
        <div className="md:flex-1 lg:-mr-1/16 2xl:-mr-1/8 w-full self-end">
          {showHero(heroData)}
        </div>
      </div>
      <div
        className="z-10 absolute bottom-0 h-[30vh] w-[99vw]"
        style={{ background: 'linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)' }}
      ></div>
    </div>
  )
}
