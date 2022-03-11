import { Preview } from 'components/Preview'
import PurpleEllipse from 'components/PurpleEllipse'
import SlideUp from 'components/SlideUpText'
import { useWindowSize } from 'lib/hooks'
import { DemoSection } from 'lib/landingTypes'
import { ReactElement, useRef } from 'react'
import { Carousel } from './Carousel'

export default function HomeDemo({ headline, previews }: DemoSection): ReactElement {
  const windowWidth = useWindowSize()?.width ?? 0

  const previewRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const stickySectionRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={previewRef}>
      <div className="flex justify-center items-center relative md:h-[60vh] h-[50vh] text-white">
        <div className="text-center md:text-head-1 text-[28px] leading-[28px] font-[275]">
          <SlideUp divRef={headingRef} text={headline} />
        </div>
      </div>
      <div
        data-element="background"
        className="relative lg:flex py-section justify-center items-start container"
        style={{
          willChange: 'background',
          minHeight: `${windowWidth >= 1024 ? `${previews.length + 1}00vh` : 'auto'} `,
        }}
      >
        <PurpleEllipse enableTransition={true} rootRef={previewRef} />

        {windowWidth >= 1024 ? (
          <div
            className="container w-full sticky top-[20%] h-screen overflow-hidden transform flex items-start justify-center"
            ref={stickySectionRef}
          >
            {previews.map((previewItem, index) => (
              <Preview
                item={previewItem}
                index={index}
                key={previewItem.assetId}
                rootRef={previewRef}
                length={previews.length + 1}
              />
            ))}
          </div>
        ) : (
          <Carousel data={previews} />
        )}
      </div>
    </section>
  )
}
