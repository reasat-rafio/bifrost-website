import clsx from "clsx";
import { Button } from "components/ui/button";
import { CTAButton } from "lib/@types/global-types";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { PortableText, imageUrlBuilder } from "utils/sanity";

export interface ProjectProps {
  _key: string;
  _type: string;
  ctaButton?: CTAButton;
  description: string;
  image: SanityImage;
  title: string;
  subtitle?: string;
}

interface ProjectsProps {
  type: string;
  projects: ProjectProps[];
}

export const ProjectsBlock: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section className="py-10 md:py-14 lg:py-40">
      <div className="container ">
        <div className="flex flex-col space-y-10 md:space-y-14 lg:space-y-40">
          {projects.map(
            (
              { _key, title, image, description, subtitle, ctaButton },
              index
            ) => (
              <article
                key={_key}
                className="relative flex flex-col justify-end"
              >
                <figure
                  className={clsx(
                    index % 2 ? "left-0" : "right-0",
                    "| | | top-1/2 max-h-[450px] w-full overflow-hidden rounded-2xl lg:absolute lg:w-[70%] lg:-translate-y-1/2 xl:w-[55%]"
                  )}
                >
                  <SanityImg
                    className="| h-full w-full object-cover"
                    image={image}
                    builder={imageUrlBuilder}
                    width={1000}
                    alt={image?.alt}
                  />
                </figure>
                <section
                  className={clsx(
                    index % 2 ? "ml-auto" : "mr-auto",
                    "| -translate-y-[5%] px-2 lg:translate-y-0 lg:px-0"
                  )}
                >
                  <div className="| | | | background__blur | flex w-full flex-col space-y-3 rounded-primary border border-gray/10 p-3 transition-transform duration-300 ease-in-out md:space-y-4 md:p-5 lg:max-w-xl xl:max-w-2xl xl:space-y-6 xl:p-7">
                    <div className="| | text-head-4-mobile font-primary leading-none md:text-head-md xl:text-head-4">
                      <PortableText
                        blocks={title}
                        serializers={{
                          marks: {
                            pop: ({ children }: any) => (
                              <span className="primary__gradient bg-clip-text text-transparent">
                                {children}
                              </span>
                            ),
                          },
                        }}
                      />
                    </div>
                    {!!subtitle && (
                      <h6 className="| text-[22px] font-light leading-none md:text-p-2 xl:text-[30px]">
                        {subtitle}
                      </h6>
                    )}
                    <p className="| text-body-1-mobile font-light md:text-body-1">
                      {description}
                    </p>
                    {!!ctaButton && (
                      <div className="relative z-20">
                        <Button
                          className="!w-fit px-8 py-2 md:px-10 md:py-2"
                          variant="secondary"
                          type="href"
                          href={ctaButton?.href ?? ""}
                        >
                          {ctaButton.title}
                        </Button>
                      </div>
                    )}
                  </div>
                </section>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
};
