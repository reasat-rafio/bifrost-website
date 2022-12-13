import { SanityImage } from 'sanity-react-extra'
import { CTAButton } from 'lib/@types/types'
import { useEffect, useRef, useState } from 'react'
import { animationFrameEffect, useVisibleScrollEffect, useWindowSize } from 'lib/hooks'
import { motion } from 'framer-motion'
import { FullImageTextRight } from './variants/full-image-text-right'
import { FullImageTextLeft } from './variants/full-image-text-left'
import { HalfImageTextLeft } from './variants/half-image-text-left'
import { HalfImageTextRight } from './variants/half-image-text-right'
import clsx from 'clsx'
import { Anchor } from './anchor'

interface ProjectsProps {
  type: string
  projects: ProjectProps[]
}

export interface ProjectProps {
  _key: string
  _type: string
  ctaButton: CTAButton
  description: string
  image: SanityImage
  title: string
  subtitle?: string
  variant:
    | 'full-image-text-right'
    | 'full-image-text-left'
    | 'half-image-text-right'
    | 'half-image-text-left'
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const windowHeight = useWindowSize()?.height ?? 0
  const windowWidth = useWindowSize()?.width ?? 0
  const [activeProject, setActiveProject] = useState(projects[0])
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [navbarHeight, setNavbarHeight] = useState(0)

  useEffect(() => {
    const navHeight = document.querySelector('#navbar').clientHeight
    setNavbarHeight(navHeight)
  }, [windowWidth])

  useVisibleScrollEffect(
    sectionRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        const yDelta = y + windowHeight - offsetBoundingRect.top
        const ratio = Math.max(0, Math.min(yDelta / windowHeight, projects.length))
        const index = Math.floor(Math.min(ratio, projects.length - 1))
        setActiveProjectIndex(index)
        setActiveProject(projects[index])
      }),
    [windowHeight, projects],
  )

  return (
    <section ref={sectionRef} style={{ height: `${projects.length * 100}vh` }} className="pt-14 ">
      <div
        style={{ top: `calc(${windowWidth >= 1024 ? '5' : '1'}% + ${navbarHeight}px)` }}
        className="container h-screen sticky"
      >
        <Anchor
          sectionRef={sectionRef}
          projects={projects}
          activeProjectIndex={activeProjectIndex}
          windowHeight={windowHeight}
        />
        <div className="lg:w-full w-[95%] ml-auto">
          {activeProject.variant === 'full-image-text-right' ? (
            <FullImageTextRight {...activeProject} />
          ) : activeProject.variant === 'full-image-text-left' ? (
            <FullImageTextLeft {...activeProject} />
          ) : activeProject.variant === 'half-image-text-left' ? (
            <HalfImageTextLeft {...activeProject} />
          ) : activeProject.variant === 'half-image-text-right' ? (
            <HalfImageTextRight {...activeProject} />
          ) : null}
        </div>
      </div>
    </section>
  )
}
