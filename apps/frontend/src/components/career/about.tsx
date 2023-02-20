import { Description } from "components/ui/description";
import { AboutSectionProps } from "lib/@types/about-us-types";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "utils/sanity";
import { useIntersection, useWindowSize } from "lib/hooks";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Section } from "components/ui/section";
import { Title } from "components/ui/title";
import { Heading } from "components/ui/heading";
import { VFadeInOut } from "animations/fade-in-out";
import { Button } from "components/ui/button";

const About: React.FC<AboutSectionProps> = ({
  description,
  image,
  title,
  heading,
  ctaButton,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const sectionRef = useRef<HTMLElement>(null);
  const intersecting = useIntersection(sectionRef, {
    threshold: 0.1,
  })?.isIntersecting;

  return (
    <Section
      ref={sectionRef}
      className="grid grid-cols-1 space-y-5 sm:space-y-10 md:grid-cols-2 md:gap-14 md:space-y-0 lg:gap-20 xl:gap-32"
    >
      <figure className="max-h-[520px]">
        <SanityImg
          className="h-full w-full rounded-primary object-cover"
          width={windowWidth >= 1280 ? 600 : windowWidth >= 640 ? 400 : 300}
          image={image}
          builder={imageUrlBuilder}
          alt={image.alt}
        />
      </figure>

      <section className="spacing_primary font-light">
        {!!title && (
          <Title animate={{ show: intersecting, delay: 0.1 }}>{title}</Title>
        )}
        {!!heading && (
          <Heading animate={{ show: intersecting, delay: 0.15 }}>
            {heading}
          </Heading>
        )}
        {!!description && (
          <Description
            variant="small"
            animate={{ show: intersecting, delay: 0.2 }}
          >
            {description}
          </Description>
        )}

        {!!ctaButton && (
          <motion.div
            initial="from"
            animate={intersecting ? "to" : "from"}
            variants={VFadeInOut({ delay: 0.25 })}
          >
            <Button variant="outline" type="href" href={ctaButton.href}>
              {ctaButton.title}
            </Button>
          </motion.div>
        )}
      </section>
    </Section>
  );
};

export default About;
