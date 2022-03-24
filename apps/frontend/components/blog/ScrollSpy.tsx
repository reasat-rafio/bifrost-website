import { BlogBody, BlogProps } from 'lib/@types/blogTypes'
import React, { RefObject, useEffect, useState } from 'react'

interface ScrollSpyProps {
  sections: BlogBody[]
  sectionRefs: RefObject<HTMLDivElement>[]
}

export const ScrollSpy: React.FC<ScrollSpyProps> = ({ sections, sectionRefs }) => {
  const [sectionWrapperHeight, setSectionWrapperHeight] = useState(0)
  const [currentelElementIndex, setCurrentElementIndex] = useState(0)

  const [selected, setSelected] = useState<BlogBody | undefined>(sections[0])

  useEffect(() => {
    const selectedSection = sections.find((_, i) => {
      return i === currentelElementIndex
    })
    const sectionWrapperScrollHeight =
      document.querySelector("[data-cy='section-wrapper']")?.scrollHeight ?? 0
    setSelected(selectedSection)
    setSectionWrapperHeight(sectionWrapperScrollHeight)
  }, [currentelElementIndex, sections])

  return <div></div>
}
