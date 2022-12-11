import { GradientTitle } from 'src/components/common/GradientTitle'
import Button from 'components/ui/_Button'
import { Description } from 'src/components/ui/Description'
import { Header } from 'src/components/ui/Header'
import { AssuranceSection } from 'src/lib/@types/useCaseTypes'
import { ReactElement, useCallback, useState } from 'react'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'src/utils/sanity'

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
      className="xl:pb-40 lg:pb-20 pb-16  mx-[1.6rem] sm:mx-[2rem] lg:mx-[4rem] xl:mx-[6rem] 2xl:mx-[11rem] 3xl:mx-[10rem] xl:px-[72px]"
      style={{
        marginBottom: `${windowWidth >= 1280 ? `${blockHeight / 2}px` : `${blockHeight}px`}`,
      }}
    >
      <div className="container z-10 relative grid grid-cols-12 xl:!p-0">
        <div className="col-span-12">
          <SanityImg
            className="w-full  h-auto rounded-xl object-cover"
            builder={imageUrlBuilder}
            image={image}
            alt={image?.alt || 'image'}
            height={windowWidth >= 768 ? 500 : 350}
          />
        </div>
        <div
          className="2xl:w-[55%] lg:w-[70%] w-[90%] absolute lg:p-12 xl:p-6 p-3 bifrost__transparent_card rounded-lg flex flex-col lg:space-y-6 space-y-2 right-[5%] bottom-0 3xl:translate-y-[35%] lg:translate-y-[55%] md:translate-y-[60%] translate-y-[90%]"
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
