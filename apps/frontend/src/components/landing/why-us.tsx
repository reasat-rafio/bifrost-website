import { Button } from "components/ui/button";
import { Description } from "components/ui/description";
import { Heading } from "components/ui/heading";
import { Section } from "components/ui/section";
import { Title } from "components/ui/title";
import { CTAButton } from "lib/@types/global-types";
import { Collection } from "lib/@types/landing-types";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "utils/sanity";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useIntersection, useWindowSize } from "lib/hooks";
import { VFadeInOut } from "animations/fade-in-out";

interface WhyUsProps {
  type: string;
  collection: Collection[];
  ctaButton: CTAButton;
  description: string;
  subtitle: string;
  title: string;
}

const WhyUs: React.FC<WhyUsProps> = ({
  title,
  subtitle,
  description,
  collection,
  ctaButton,
}) => {
  const sectionRef = useRef(null);
  const windowWidth = useWindowSize()?.width ?? 0;
  const isBigScreen = windowWidth >= 768;
  const intersecting =
    useIntersection(sectionRef, { threshold: 0.15 })?.isIntersecting ?? false;

  const animationProps = (index: number) =>
    isBigScreen
      ? {
          initial: "from",
          animate: intersecting ? "to" : "exit",
          variants: VFadeInOut({ delay: 0.415 + index * 0.08 }),
        }
      : {};

  return (
    <Section className="md:text-clip" ref={sectionRef}>
      <div className="spacing_primary font-light">
        <Title animate={{ show: intersecting, delay: 0.1 }}>{title}</Title>
        <Heading animate={{ show: intersecting, delay: 0.15 }}>
          {subtitle}
        </Heading>
        <Description animate={{ show: intersecting, delay: 0.2 }}>
          {description}
        </Description>
      </div>
      <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-2 sm:py-16 md:gap-14 md:py-28 lg:gap-20 xl:grid-cols-3">
        {collection.map(({ _key, description, image, title }, index) => (
          <motion.article
            key={_key}
            {...animationProps(index)}
            className="space-y-5"
          >
            <SanityImg
              className="aspect-square h-full max-h-[30px] w-full max-w-[30px] object-contain"
              width={50}
              builder={imageUrlBuilder}
              image={image}
              alt={image.alt}
            />
            <h4 className="text-xl font-bold lg:text-[22px]">{title}</h4>
            <Description className="opacity-80" variant="small">
              {description}
            </Description>
          </motion.article>
        ))}
      </div>
      <div className="flex h-full w-full items-center justify-center">
        {!!ctaButton && (
          <Button
            color="green"
            variant="secondary"
            type="href"
            href={ctaButton?.href ?? ""}
          >
            {ctaButton.title}
          </Button>
        )}
      </div>
    </Section>
  );
};

export default WhyUs;
