import { BlogBody } from 'lib/@types/blog-types'
import React, { createRef, useEffect, useState } from 'react'
import { ScrollSpyWrapper } from '../scroll-spy-wrapper'
import { BlogSection } from './blog-section'
import { Introduction } from './introduction'
import { ShareWith } from './share-with'

interface BodyProps {
  body: BlogBody[]
  paddingY: number
}

const renderBlogArray = (body: BlogBody) => {
  switch (body._type) {
    case 'introduction':
      return <Introduction {...body} />
    case 'section':
      return <BlogSection {...body} />
    case 'share':
      return <ShareWith />
  }
}

export const Body: React.FC<BodyProps> = ({ body, paddingY }) => {
  const [sectionRefs, setSectionRefs] = useState([])
  const shareBlock: BlogBody = {
    _key: String(Math.random() * 100),
    _type: 'share',
    heading: 'Share With',
  }
  const sections = [...body, shareBlock]
  const totalSectionsLength = sections.length

  useEffect(() => {
    setSectionRefs((sectionRefs) =>
      [...Array(totalSectionsLength)].map((_, i) => sectionRefs[i] || createRef()),
    )
  }, [totalSectionsLength])

  return (
    <section className="mt-5  max-w-none">
      <ScrollSpyWrapper paddingY={paddingY} sections={sections} sectionRefs={sectionRefs}>
        <div
          data-cy="section-wrapper"
          className="lg:col-span-9 relative rounded-lg space-y-10 2xl:max-w-5xl max-w-4xl text-[#183B56] lg:mt-0 mt-20"
        >
          {sections.map((section, index) => (
            <div
              id={`section-${index}`}
              key={section._key}
              ref={sectionRefs[index]}
              className="scroll-mt-[120px] lg:scroll-mt-[100px] "
            >
              {renderBlogArray(section)}
            </div>
          ))}
        </div>
      </ScrollSpyWrapper>
    </section>
  )
}
