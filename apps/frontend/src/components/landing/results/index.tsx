import { Heading } from 'components/ui/heading'
import { Title } from 'components/ui/title'
import { Result } from 'lib/@types/landing-types'
import { PortableText } from 'utils/sanity'
import { DownArrowIcon, UpArrowIcon } from './graident-arrow-icons'
import { Description } from 'components/ui/description'

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
  return (
    <section className="relative z-10 | container mx-auto lg:py-32 py-20 | border-b border-secondary/80">
      <div className="space-y-8 lg:px-[4%] | font-light">
        <Title>{title}</Title>
        <Heading>{heading}</Heading>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 | sm:gap-10 gap-5 lg:mt-20 mt-14 ">
          {results.map(({ _key, description, indicatorIcon, isPercentage, number }) => (
            <div key={_key}>
              <div className="flex items-center | space-x-4 | lg:text-head-1 md:text-head-2 sm:text-head-4 text-head-3 | text-transparent bg-clip-text | bg-gradient-to-br from-[#70FCEB] via-[#9BB8FF] to-[#B794FF]">
                <div>
                  <span>{number}</span>
                  {!!isPercentage && <span>%</span>}
                </div>
                <span className="py-[8px] px-[6px] bg-[#102134] rounded-[31.5px] border-none">
                  {renderIndecatorIcon(indicatorIcon)}
                </span>
              </div>

              <Description>
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
    </section>
  )
}
