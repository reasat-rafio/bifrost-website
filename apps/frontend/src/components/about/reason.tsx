import { motion } from "framer-motion";
import { ReasonSection } from "lib/@types/about-us-types";
import { useRef } from "react";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder, PortableText } from "utils/sanity";
import { useWindowSize } from "lib/hooks";
import { Section } from "components/ui/section";
import { Title } from "components/ui/title";
import { Heading } from "components/ui/heading";
import { Description } from "components/ui/description";

const Reason: React.FC<ReasonSection> = ({ title, heading, agenda }) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const sectionRef = useRef<HTMLElement>(null);
  // const intersecting = useIntersection(sectionRef, {
  //   threshold: 0.5,
  // })?.isIntersecting;

  return (
    <Section ref={sectionRef}>
      <header className="spacing_primary font-light">
        <Title>{title}</Title>
        <Heading>{heading}</Heading>
      </header>

      <section className="mt-10 grid grid-cols-1 space-y-5 sm:mt-14 sm:space-y-10 md:mt-20 md:grid-cols-2 md:gap-14 md:space-y-0 lg:gap-20 xl:gap-32">
        <motion.div className="my-auto space-y-2 font-light">
          <h4 className="text-2xl leading-[120%] tracking-[2px] drop-shadow-md sm:text-3xl lg:text-p-1">
            {agenda.heading}
          </h4>
          <Description
            className="prose !leading-[30px]"
            variant="small"
            type="div"
          >
            <PortableText blocks={agenda.description} />
          </Description>
        </motion.div>

        <motion.figure className="max-h-[520px]">
          <SanityImg
            className="h-full w-full rounded-primary object-cover"
            width={windowWidth >= 1280 ? 600 : windowWidth >= 640 ? 400 : 300}
            image={agenda.image}
            builder={imageUrlBuilder}
            alt={agenda.image.alt}
          />
        </motion.figure>
      </section>
    </Section>
  );
};

export default Reason;
