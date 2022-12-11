import { SanityImage, SanityImg } from 'sanity-react-extra'
import { CTAButton } from 'lib/@types/types'
import { imageUrlBuilder } from 'utils/sanity'
import Button from 'components/ui/_Button'
import { useRef, useState } from 'react'
import { animationFrameEffect, useVisibleScrollEffect, useWindowSize } from 'lib/hooks'
import { motion } from 'framer-motion'

interface ProjectsProps {
  type: string
  projects: Project[]
}

export interface Project {
  _key: string
  _type: string
  ctaButton: CTAButton
  description: string
  image: SanityImage
  title: string
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const windowHeight = useWindowSize()?.height ?? 0
  const [activeProject, setActiveProject] = useState(projects[0])
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)

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
    <section
      ref={sectionRef}
      style={{ height: `${projects.length * 100}vh` }}
      className="relative pt-14"
    >
      <section key={activeProject._key} className="container sticky top-[15%]">
        <ul className="flex flex-col space-y-2 absolute top-[30%] left-[5%] -translate-y-1/2">
          {projects.map(({ _key }, index) => (
            <motion.li
              whileHover={{ scale: 1.6 }}
              initial={{ scale: 1 }}
              animate={{ scale: index === activeProjectIndex ? 1.6 : 1 }}
              onClick={() => {
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
              }}
              className="h-[8px] w-[8px] bg-[#757AAC] rounded-full cursor-pointer"
              key={_key}
            />
          ))}
        </ul>

        <motion.figure
          key={activeProject._key}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, type: 'tween' }}
          className="w-full overflow-hidden"
        >
          <SanityImg
            className="w-full h-full max-h-[560px] | object-cover rounded-2xl"
            builder={imageUrlBuilder}
            width={1000}
            image={activeProject.image}
            alt={activeProject.image?.alt}
          />
        </motion.figure>

        <motion.section
          key={activeProject._key}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, type: 'tween' }}
          className="flex justify-end"
        >
          <div className="max-w-lg | flex flex-col xl:space-y-6 md:space-y-4 space-y-3 | xl:p-7 md:p-5 p-3 | border-gray/10 border | lg:-translate-y-1/2 sm:-translate-y-[30%] -translate-y-[20%]  | lg:mr-[5%] lg:ml-0 mr-[2.5%] ml-[2.5%] | background__blur rounded-primary | transition-transform duration-300 ease-in-out">
            <h6 className="xl:text-head-4 md:text-head-md text-head-4-mobile | leading-none | font-primary">
              {activeProject.title}
            </h6>
            <p className="md:text-body-1 text-body-1-mobile | font-light">
              {activeProject.description}
            </p>
            {!!activeProject?.ctaButton && (
              <div className="z-20 relative">
                <Button
                  className="!w-fit md:px-10 md:py-2 px-8 py-2"
                  variant="secondary"
                  type="href"
                  href={activeProject.ctaButton?.href ?? ''}
                >
                  {activeProject.ctaButton.title}
                </Button>
              </div>
            )}
          </div>
        </motion.section>
      </section>
    </section>
  )
}
