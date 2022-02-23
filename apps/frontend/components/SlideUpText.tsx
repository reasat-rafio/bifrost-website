import clsx from 'clsx'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { useIntersection } from 'react-use'
import { PortableText } from 'utils/sanity'

export default function SlideUp({
  text,
  blocks,
  heroTitle,
}: {
  text?: string
  blocks?: any[]
  heroTitle?: boolean
}): ReactElement {
  const divRef = useRef(null)
  const intersection = useIntersection(divRef, { threshold: 0.2 })
  const lines = text?.split(/\r\n|\n/)
  const [intersected, setIntersected] = useState(false)

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setIntersected(true)
    }
  }, [intersection?.isIntersecting])

  return (
    <>
      {blocks !== undefined ? (
        <div ref={divRef} data-animate="slideUp" className={clsx(intersected && 'show')}>
          <span>
            <span
              className={clsx(heroTitle ? 'md:text-[120px] text-6xl font-normal' : 'section-body')}
            >
              <PortableText blocks={blocks} />
            </span>
          </span>
        </div>
      ) : (
        <>
          {lines?.map((line: string) => (
            <div
              ref={divRef}
              key={line}
              data-animate="slideUp"
              className={clsx(intersected && 'show')}
            >
              <span>
                <span>{line}</span>
              </span>
            </div>
          ))}
        </>
      )}
    </>
  )
}
