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
    console.log(navHeight)

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
      <div style={{ top: `calc(5% + ${navbarHeight}px)` }} className="container h-screen sticky">
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
    </section>
  )
}

// {
//   projects.map(({ _key, ctaButton, description, image, title }) => (
//     <article className="sticky top-0">
//       <motion.figure
//         key={_key}
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.4, type: 'tween' }}
//         className="w-full overflow-hidden"
//       >
//         <SanityImg
//           className="w-full h-full max-h-[560px] | object-cover rounded-2xl"
//           builder={imageUrlBuilder}
//           width={1000}
//           image={image}
//           alt={image?.alt}
//         />
//       </motion.figure>

//       <motion.section
//         key={_key}
//         initial={{ scale: 0.8 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 0.4, type: 'tween' }}
//         className="flex justify-end"
//       >
//         <div className="max-w-lg | flex flex-col xl:space-y-6 md:space-y-4 space-y-3 | xl:p-7 md:p-5 p-3 | border-gray/10 border | lg:-translate-y-1/2 sm:-translate-y-[30%] -translate-y-[20%]  | lg:mr-[5%] lg:ml-0 mr-[2.5%] ml-[2.5%] | background__blur rounded-primary | transition-transform duration-300 ease-in-out">
//           <h6 className="xl:text-head-4 md:text-head-md text-head-4-mobile | leading-none | font-primary">
//             {title}
//           </h6>
//           <p className="md:text-body-1 text-body-1-mobile | font-light">{description}</p>
//           {!!ctaButton && (
//             <div className="z-20 relative">
//               <Button
//                 className="!w-fit md:px-10 md:py-2 px-8 py-2"
//                 variant="secondary"
//                 type="href"
//                 href={ctaButton?.href ?? ''}
//               >
//                 {ctaButton.title}
//               </Button>
//             </div>
//           )}
//         </div>
//       </motion.section>
//     </article>
//   ))
// }
