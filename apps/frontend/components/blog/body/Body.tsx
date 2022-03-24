import { BlogBody } from 'lib/@types/blogTypes'
import React, { createRef, useEffect, useState } from 'react'
import { ScrollSpyWrapper } from '../ScrollSpyWrapper'
import { BlogSection } from './BlogSection'
import { Introduction } from './Introduction'

interface BodyProps {
  body: BlogBody[]
}

export const Body: React.FC<BodyProps> = ({ body }) => {
  const [sectionRefs, setSectionRefs] = useState([])
  const sections = body

  const totalSectionsLength = sections.length

  useEffect(() => {
    setSectionRefs((sectionRefs) =>
      [...Array(totalSectionsLength)].map((_, i) => sectionRefs[i] || createRef()),
    )
  }, [totalSectionsLength])

  return (
    <section className="mt-5">
      <ScrollSpyWrapper sections={sections} sectionRefs={sectionRefs}>
        <div
          data-cy="section-wrapper"
          className="lg:col-span-9 relative rounded-lg space-y-10 max-w-5xl text-[#183B56]"
        >
          {sections.map((section, index) => (
            <div
              id={`section-${index}`}
              key={section._key}
              ref={sectionRefs[index]}
              className="scroll-mt-[120px] lg:scroll-mt-[100px] "
            >
              {section._type === 'introduction' ? (
                <Introduction {...section} />
              ) : (
                <BlogSection {...section} />
              )}
            </div>
          ))}
        </div>
      </ScrollSpyWrapper>
    </section>
  )
}
