import { Button } from "components/ui/button";
import { CTAButton } from "lib/@types/global-types";
import { useWindowSize } from "lib/hooks";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "utils/sanity";
import { useMemo, useRef } from "react";
import { useIntersection } from "lib/hooks";
import { Title } from "components/ui/title";
import { Heading } from "components/ui/heading";
import { Description } from "components/ui/description";
import { GradientBorder } from "components/ui/gradient-border";
import { Section } from "components/ui/section";

interface InformationProps {
  type: string;
  heading?: string;
  title: string;
  description: string;
  image: SanityImage;
  cta?: CTAButton;
}

const Information: React.FC<InformationProps> = ({
  image,
  title,
  heading,
  cta,
  description,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const sectionRef = useRef<HTMLElement>(null);
  const intersecting = useIntersection(sectionRef, {
    threshold: 0.15,
  })?.isIntersecting;
  const imageWidth = useMemo(
    () => (windowWidth >= 1280 ? 1200 : windowWidth > 768 ? 700 : 400),
    [windowWidth]
  );

  return (
    <GradientBorder
      ref={sectionRef}
      maxWidth="max-w-[1230px]"
      innerClass="md:p-16 sm:p-8 p-5"
    >
      <Section
        isContainer={false}
        borderBottom={false}
        padding={false}
        className="flex flex-col md:flex-row"
      >
        <section className="flex w-full flex-1 justify-center ">
          <div className="spacing_primary my-auto mr-auto h-fit w-full md:w-[85%]">
            <Title animate={{ show: intersecting, delay: 0.1 }}>{title}</Title>
            <Heading
              className="text-ghost-white"
              animate={{ show: intersecting, delay: 0.15 }}
            >
              {heading}
            </Heading>
            <Description
              variant="small"
              animate={{ show: intersecting, delay: 0.2 }}
            >
              {description}
            </Description>
            {!!cta && (
              <div className="sm:pt-6">
                <Button type="href" variant="outline" href={cta.href}>
                  {cta.title}
                </Button>
              </div>
            )}
          </div>
        </section>
        <figure className="mt-[64px] w-full flex-1 overflow-hidden md:mt-0">
          <SanityImg
            className="h-full max-h-[515px] w-full rounded-primary object-cover"
            image={image}
            alt={image.alt}
            builder={imageUrlBuilder}
            width={imageWidth}
          />
        </figure>
      </Section>
    </GradientBorder>
  );
};

export default Information;
