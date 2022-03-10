import { Preview } from 'components/Preview'
import PurpleEllipse from 'components/PurpleEllipse'
import { useWindowSize } from 'lib/hooks'
import { DemoSection } from 'lib/landingTypes'
import { ReactElement, useRef } from 'react'
import { Carousel } from './Carousel'

export default function HomeDemo({ previews }: DemoSection): ReactElement {
  const windowWidth = useWindowSize()?.width ?? 0

  const previewRef = useRef<HTMLDivElement>(null)
  const stickySectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      data-element="background"
      className="relative flex py-section justify-center items-start"
      style={{
        willChange: 'background',
        minHeight: `${windowWidth >= 1024 ? `${previews.length + 1}00vh` : 'auto'} `,
      }}
      ref={previewRef}
    >
      <PurpleEllipse enableTransition={true} rootRef={previewRef} />

      {windowWidth >= 1024 ? (
        <div
          className="container w-full sticky top-[20%] h-screen overflow-hidden transform flex items-start justify-center 2xl:mx-6"
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
    </section>
  )
}
