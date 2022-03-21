import { GradientTitle } from 'components/common/GradientTitle'
import Button from 'components/ui/Button'
import { Description } from 'components/ui/Description'
import { Header } from 'components/ui/Header'
import { AssuranceSection } from 'lib/@types/useCaseTypes'
import { ReactElement, useCallback, useState } from 'react'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

export default function UseCaseAssurance({
  body,
  ctaButton,
  headline,
  image,
  subHeadline,
}: AssuranceSection): ReactElement {
  const { width: windowWidth } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  const [blockHeight, setBlockHeight] = useState(0)

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const handleHeight = () => setBlockHeight(node.clientHeight)
      handleHeight()
      window.addEventListener('resize', handleHeight)
      window.addEventListener('load', handleHeight)
    }
  }, [])

  return (
    <section
      className="xl:mb-40 lg:mb-20 mb-16"
      style={{
        marginBottom: `${windowWidth >= 1280 ? `${blockHeight / 2}px` : `${blockHeight}px`}`,
      }}
    >
      <div className="container z-10 relative grid grid-cols-12">
        <div className="col-span-12">
          <SanityImg
            className="w-full 2xl:h-[580px] md:h-[400px] h-auto rounded-xl object-cover"
            builder={imageUrlBuilder}
            image={image}
            alt={image?.alt || 'image'}
            height={windowWidth >= 768 ? 500 : 350}
          />
        </div>
        <div
          className="absolute bottom-0 2xl:col-start-6 xl:col-start-3 col-start-2 col-end-12 xl:col-end-12 bifrost__transparent__card xl:translate-y-[50%] xl:translate-x-0 translate-x-[5%] translate-y-[80%] flex flex-col justify-center 2xl:p-14 lg:p-8 p-5 2xl:space-y-6 space-y-3 border border-[#4e6181]/30"
          ref={measuredRef}
        >
          <GradientTitle>{subHeadline}</GradientTitle>
          <Header>{headline}</Header>
          <Description>{body}</Description>
          <div className="flex">
            <span>
              <Button className=" ">
                <a href={ctaButton.href}>{ctaButton.title}</a>
              </Button>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
