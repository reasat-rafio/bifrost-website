import clsx from 'clsx'
import Button from 'components/ui/Button'
import { useCtx } from 'contexts/global'
import { marksSerializer, typesSerializer } from 'lib/blockContent'
// import { showHero } from 'lib/showHero'
import { ProductSection } from 'lib/types'
import { ReactElement } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder, PortableText } from 'utils/sanity'

export default function HomeProduct(data: ProductSection): ReactElement {
  // const heroData: HeroData = { type: 'image', image: data.image }
  console.log({ data })

  const { isWhite } = useCtx()

  return (
    <div
      className={clsx(
        'container flex flex-col-reverse md:flex-row z-10 md:space-x-12 md:space-y-0 relative h-[100vh]',
        isWhite ? 'text-black' : 'text-white',
      )}
    >
      <div className="md:flex-1 lg:-mr-1/16 2xl:-mr-1/8 w-full self-center grid grid-cols-2 gap-4">
        {data.images.map((image) => (
          <SanityImg
            key={image?.alt}
            builder={imageUrlBuilder}
            image={image}
            alt={image?.alt}
            className="w-full object-contain"
          />
        ))}
      </div>
      <div className="flex flex-col items-center md:items-start md:flex-1 space-y-8 self-center bifrost__card py-[5rem] px-[3.75rem]">
        <div>
          <h3 className="text-head-5 bifrost__gradient_green text-transparent bg-clip-text uppercase">
            {data.subHeadline}
          </h3>
          <h1 className="text-head-2  font-[275]">{data.headline}</h1>
        </div>
        <div className="text-head-6 leading-[32px] opacity-[0.7]">
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
    </div>
  )
}
