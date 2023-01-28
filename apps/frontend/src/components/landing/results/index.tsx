import { Heading } from 'components/ui/heading'
import { Title } from 'components/ui/title'
import { Result } from 'lib/@types/landing-types'
import { PortableText } from 'utils/sanity'
import { DownArrowIcon, UpArrowIcon } from './graident-arrow-icons'
import { Description } from 'components/ui/description'
import { Section } from 'components/ui/section'
import { useEffect, useRef } from 'react'
import { AnimationPlaybackControls, animate } from 'framer-motion'
import { useIntersection } from 'lib/hooks'

interface ResultsProps {
  type: string
  heading: string
  results: Result[]
  title: string
}

const renderIndecatorIcon = (indicatorIcon: Result['indicatorIcon']) => {
  switch (indicatorIcon) {
    case 'increase':
      return <UpArrowIcon />
    case 'decrease':
      return <DownArrowIcon />
    case 'none':
      break
    default:
      break
  }
}
export const Results: React.FC<ResultsProps> = ({ heading, results, title }) => {
  const sectionRef = useRef(null)
  const isIntersecting = useIntersection(sectionRef, { threshold: 0.35 })?.isIntersecting ?? false

  return (
    <Section ref={sectionRef}>
      <div className="spacing_primary lg:px-[4%] | font-light">
        <Title animate={{ show: isIntersecting, delay: 0.1 }}>{title}</Title>
        <Heading animate={{ show: isIntersecting, delay: 0.15 }}>{heading}</Heading>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 | lg:gap-20 sm:gap-10 gap-5 lg:mt-20 mt-14">
          {results.map(({ _key, description, indicatorIcon, isPercentage, number }) => (
            <div key={_key}>
              <div className="flex items-center | space-x-4 | lg:text-head-1 md:text-head-2 sm:text-head-4 text-head-3 | text-transparent bg-clip-text | bg-gradient-to-br from-[#70FCEB] via-[#9BB8FF] to-[#B794FF]">
                <div className="flex">
                  <Counter animationStart={isIntersecting} from={0} to={number} />
                  {!!isPercentage && <span>%</span>}
                </div>
                <span className="py-[8px] px-[6px] bg-[#102134] rounded-[31.5px] border-none">
                  {renderIndecatorIcon(indicatorIcon)}
                </span>
              </div>

              <Description animate={{ show: isIntersecting, delay: 0.2 }}>
                <PortableText
                  blocks={description}
                  serializers={{
                    marks: {
                      pop: ({ children }: any) => (
                        <span className="text-transparent bg-clip-text primary__gradient">
                          {children}
                        </span>
                      ),
                    },
                  }}
                />
              </Description>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

const Counter = ({
  from,
  to,
  animationStart,
}: {
  from: number
  to: number
  animationStart: boolean
}) => {
  const nodeRef = useRef(null)

  useEffect(() => {
    const node = nodeRef.current
    let controls: AnimationPlaybackControls
    if (animationStart) {
      controls = animate(from, to, {
        duration: 2,
        type: 'tween',
        ease: 'anticipate',
        onUpdate(value) {
          node.textContent = value.toFixed(0)
        },
      })
    }

    return () => controls?.stop()
  }, [from, to, animationStart])

  return <p ref={nodeRef} />
}
