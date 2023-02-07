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

const About: React.FC<AboutSectionProps> = ({
  description,
  image,
  title,
  heading,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const sectionRef = useRef<HTMLElement>(null);
  const intersecting = useIntersection(sectionRef, {
    threshold: 0.5,
  })?.isIntersecting;

  return (
    <Section ref={sectionRef} className="grid grid-cols-2 gap-32">
      <motion.figure
        initial="from"
        whileInView="to"
        variants={VFadeInOut({ duration: 0.8 })}
      >
        <SanityImg
          className="h-full w-full rounded-primary object-cover"
          width={windowWidth >= 1280 ? 600 : windowWidth >= 640 ? 400 : 300}
          image={image}
          builder={imageUrlBuilder}
          alt={image.alt}
        />
      </motion.figure>

      <section className="spacing_primary | font-light">
        <Title animate={{ show: intersecting, delay: 0.1 }}>{title}</Title>
        {!!heading && (
          <Heading animate={{ show: intersecting, delay: 0.15 }}>
            {heading}
          </Heading>
        )}
        {!!description && (
          <Description animate={{ show: intersecting, delay: 0.2 }}>
            {description}
          </Description>
        )}
      </section>
    </Section>
  );
};

export default About;
