import PurpleEllipse from 'src/components/PurpleEllipse'
import React, { createRef, RefObject, useEffect, useState } from 'react'
import clsx from 'clsx'

// TODO Adjust sanity so that this componnent become workable again
// TODO remove this if not necessary for the new scope
interface PrimaryWrapperProps {}

export const PrimaryWrapper: React.FC<PrimaryWrapperProps> = (props) => {
  let children: any = React.Children.toArray(props.children)
  const [sectionsRef, setSectionsRef] = useState([])

  useEffect(() => {
    setSectionsRef((watchonViewRef) =>
      Array.from({ length: children.length }).map((_, i) => watchonViewRef[i] || createRef()),
    )
  }, [children.length])

  return (
    <div>
      {sectionsRef.length &&
        children.map((child: any, index: number) => (
          <Section sectionRef={sectionsRef[index]} key={`section-${index}`}>
            {child}
          </Section>
        ))}
    </div>
  )
}

const Section: React.FC<{ sectionRef: RefObject<any>; setActiveSection?: any; children: any }> = ({
  children,
  sectionRef,
}) => {
  const hideSection = (children as any)?.props?.initials?.hide
  const hasEllipse = (children as any)?.props?.initials?.hasEllipse
  const transitionDisable = (children as any)?.props?.initials?.transitionDisable
  const id = (children as any)?.props.type?.split('.').join('-')

  return (
    <div className={clsx('relative', hideSection ? 'hidden' : 'block')} id={id} ref={sectionRef}>
      {hasEllipse && <PurpleEllipse enableTransition={!transitionDisable} rootRef={sectionRef} />}
      <div>{children}</div>
    </div>
  )
}
