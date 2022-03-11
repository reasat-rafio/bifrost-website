import PurpleEllipse from 'components/PurpleEllipse'
import React, { createRef, RefObject, useEffect, useState } from 'react'
import clsx from 'clsx'

interface PageProps {}

export const Page: React.FC<PageProps> = (props) => {
  let children: any = React.Children.toArray(props.children)

  const [watchonViewRefs, setWatchonViewRef] = useState([])

  useEffect(() => {
    setWatchonViewRef((watchonViewRef) =>
      Array.from({ length: children.length }).map((_, i) => watchonViewRef[i] || createRef()),
    )
  }, [children.length])

  return (
    <div>
      {children.map((child: any, index: number) => (
        <Section sectionRef={watchonViewRefs[index]} key={`care-guide-section-${index}`}>
          {child}
        </Section>
      ))}
    </div>
  )
}

const Section: React.FC<{ sectionRef: RefObject<any>; setActiveSection?: any }> = ({
  children,
  sectionRef,
}) => {
  const hideSection = (children as any)?.props.hide
  const hasEllipse = (children as any)?.props.hasEllipse
  const id = (children as any)?.props.type?.split('.').join('-')

  return (
    <div className={clsx(hideSection ? 'hidden' : 'block')} id={id} ref={sectionRef}>
      {hasEllipse && <PurpleEllipse enableTransition={true} rootRef={sectionRef} />}
      <div>{children}</div>
    </div>
  )
}
