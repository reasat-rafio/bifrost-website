import { SanityImage } from 'sanity-react-extra'
import { CTAButton } from 'lib/@types/types'
import { useEffect, useRef, useState } from 'react'
import { animationFrameEffect, useVisibleScrollEffect, useWindowSize } from 'lib/hooks'
import { motion } from 'framer-motion'
import { FullImageTextRight } from './variants/full-image-text-right'
import { FullImageTextLeft } from './variants/full-image-text-left'
import { HalfImageTextLeft } from './variants/half-image-text-left'
import { HalfImageTextRight } from './variants/half-image-text-right'

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

  const anchorOnClickAction = (index: number) => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top:
          sectionRef.current.getBoundingClientRect().top +
          window.pageYOffset +
          windowHeight * index -
          5,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section ref={sectionRef} style={{ height: `${projects.length * 100}vh` }} className="pt-14 ">
      <div style={{ top: `calc(5% + ${navbarHeight}px)` }} className="container h-screen sticky">
        <ul className="flex flex-col space-y-2 absolute top-[30%] left-[5%] -translate-y-1/2 |  z-20">
          {projects.map(({ _key }, index) => (
            <motion.li
              whileHover={{ scale: 1.6 }}
              initial={{ scale: 1 }}
              animate={{ scale: index === activeProjectIndex ? 1.6 : 1 }}
              onClick={() => anchorOnClickAction(index)}
              className="h-[8px] w-[8px] bg-[#757AAC] rounded-full cursor-pointer"
              key={_key}
            />
          ))}
        </ul>
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
