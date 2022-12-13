import React, { RefObject } from 'react'
import { ProjectProps } from '.'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface AnchorProps {
  projects: ProjectProps[]
  windowHeight: number
  activeProjectIndex: number
  sectionRef: RefObject<HTMLElement>
}

export const Anchor: React.FC<AnchorProps> = ({
  projects,
  windowHeight,
  activeProjectIndex,
  sectionRef,
}) => {
  const anchorOnClickAction = (index: number) => {
    if (typeof window !== 'undefined' && sectionRef?.current) {
      window.scrollTo({
        top:
          sectionRef?.current?.getBoundingClientRect().top +
          window.pageYOffset +
          windowHeight * index -
          1,
        behavior: 'smooth',
      })
    }
  }
  return (
    <ul className="flex flex-col space-y-3 absolute top-[30%] 2xl:left-[10%] left-[5%] -translate-y-1/2 |  z-20">
      {projects.map(({ _key }, index) => (
        <motion.li
          key={_key}
          whileHover={{ scale: 1.4 }}
          initial={{ scale: 1 }}
          animate={{
            scale: index === activeProjectIndex ? 1.7 : 1,
          }}
          onClick={() => anchorOnClickAction(index)}
          className="relative group | h-[6px] w-[6px] | p-1 rounded-full cursor-pointer | bg-gradient-to-r from-[#F8E9FF] via-[#E4ACFF] to-[#7187FF]"
        >
          <span
            className={clsx(
              'absolute top-1/2 left-1/2 | bg-white rounded-full | group-hover:h-[70%] group-hover:w-[70%] | -translate-x-1/2 -translate-y-1/2',
              index === activeProjectIndex ? 'h-[70%] w-[70%]' : 'w-full h-full',
            )}
          />
        </motion.li>
      ))}
    </ul>
  )
}

// export const Anchor = React.forwardRef<HTMLElement, AnchorProps>(
//   ({ projects, windowHeight, activeProjectIndex }, ref) => {
//     console.log(ref)

//     const sectionRef = useForwardRef<HTMLElement>(ref)

// )
