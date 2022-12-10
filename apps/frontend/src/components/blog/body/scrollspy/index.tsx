import { RefObject } from 'react'
import { useScrollspy } from './useScrollspy'

export { useScrollspy }

interface IScrollspy {
  children: ({
    elementsStatusInViewport,
    currentElementIndexInViewport,
  }: {
    elementsStatusInViewport: boolean[]
    currentElementIndexInViewport: number
  }) => JSX.Element
  sectionRefs: RefObject<Element>[]
  rootSelector?: string
  offset?: number
}

export const Scrollspy = ({ children, sectionRefs, rootSelector, offset }: IScrollspy) => {
  const { elementsStatusInViewport, currentElementIndexInViewport } = useScrollspy({
    sectionRefs,
    rootSelector,
    offset,
  })

  return children({
    elementsStatusInViewport,
    currentElementIndexInViewport,
  })
}
