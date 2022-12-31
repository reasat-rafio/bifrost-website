import clsx from 'clsx'
import { Action } from 'src/components/Action'
import { DemoSection } from 'lib/@types/landing-types'
import { ReactElement, useRef } from 'react'

export default function HomeActions({ previews }: DemoSection): ReactElement {
  const previewRef = useRef<HTMLDivElement>(null)
  // const stickySectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      data-element="background"
      className={clsx(
        'container flex justify-center items-center z-10 relative h-[100vh]',
        'text-white',
      )}
      style={{
        willChange: 'background',
      }}
      ref={previewRef}
    >
      <div
        className={clsx('container flex justify-center items-center z-10 relative', 'text-white')}
      >
        {previews.map((previewItem, index) => (
          <Action
            item={previewItem}
            index={index}
            key={previewItem.assetId}
            rootRef={previewRef}
            length={previews.length + 1}
          />
        ))}
      </div>
    </section>
  )
}
