import clsx from 'clsx'
import { Button } from 'components/ui/button'
import { CTAButton } from 'lib/@types/global-types'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import { PortableText, imageUrlBuilder } from 'utils/sanity'

export interface ProjectProps {
  _key: string
  _type: string
  ctaButton?: CTAButton
  description: string
  image: SanityImage
  title: string
  subtitle?: string
}

interface ProjectsProps {
  type: string
  projects: ProjectProps[]
}

export const ProjectsBlock: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section className="lg:py-40 md:py-14 py-10">
      <div className="container ">
        <div className="flex flex-col lg:space-y-40 md:space-y-14 space-y-10">
          {projects.map(({ _key, title, image, description, subtitle, ctaButton }, index) => (
            <article key={_key} className="relative flex flex-col justify-end">
              <figure
                className={clsx(
                  index % 2 ? 'left-0' : 'right-0',
                  'lg:absolute top-1/2 lg:-translate-y-1/2 | xl:w-[55%] lg:w-[70%] w-full | max-h-[450px] rounded-2xl | overflow-hidden',
                )}
              >
                <SanityImg
                  className="h-full w-full | object-cover"
                  image={image}
                  builder={imageUrlBuilder}
                  width={1000}
                  alt={image?.alt}
                />
              </figure>
              <section
                className={clsx(
                  index % 2 ? 'ml-auto' : 'mr-auto',
                  'lg:translate-y-0 -translate-y-[5%] | px-2 lg:px-0',
                )}
              >
                <div className="xl:max-w-2xl lg:max-w-xl w-full | flex flex-col xl:space-y-6 md:space-y-4 space-y-3 | xl:p-7 md:p-5 p-3 | border-gray/10 border | background__blur rounded-primary | transition-transform duration-300 ease-in-out">
                  <div className="xl:text-head-4 md:text-head-md text-head-4-mobile | leading-none | font-primary">
                    <PortableText
                      blocks={title}
                      serializers={{
                        marks: {
                          pop: ({ children }: any) => (
                            <span className="text-transparent bg-clip-text gradient__white__to__green">
                              {children}
                            </span>
                          ),
                        },
                      }}
                    />
                  </div>
                  {!!subtitle && (
                    <h6 className="xl:text-[30px] md:text-[24px] text-[22px] font-light | leading-none">
                      {subtitle}
                    </h6>
                  )}
                  <p className="md:text-body-1 text-body-1-mobile | font-light">{description}</p>
                  {!!ctaButton && (
                    <div className="z-20 relative">
                      <Button
                        className="!w-fit md:px-10 md:py-2 px-8 py-2"
                        variant="secondary"
                        type="href"
                        href={ctaButton?.href ?? ''}
                      >
                        {ctaButton.title}
                      </Button>
                    </div>
                  )}
                </div>
              </section>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
