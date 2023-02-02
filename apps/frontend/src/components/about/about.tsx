import { Description } from "components/ui/description";
// import { Heading } from 'components/ui/heading'
import { AboutSectionProps } from "lib/@types/about-us-types";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "utils/sanity";
import { useIntersection, useWindowSize } from "lib/hooks";
import { useRef } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

const About: React.FC<AboutSectionProps> = ({
  description,
  ctaButton,
  image,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const sectionRef = useRef<HTMLElement>(null);
  const intersecting = useIntersection(sectionRef, {
    threshold: 0.5,
  })?.isIntersecting;

  return (
    <article ref={sectionRef} className="mx-5">
      <div className="| | z-10 mx-auto grid max-w-5xl grid-cols-1 py-16 md:grid-cols-2 lg:py-20 xl:py-40 2xl:max-w-6xl 3xl:container">
        <figure className="| aspect-video max-h-[720px] w-full translate-x-0 overflow-hidden rounded-primary md:aspect-[2.5/3] md:translate-x-[20%]">
          <SanityImg
            className={clsx(
              "| | h-full w-full object-cover transition-transform duration-700 ease-in-out",
              intersecting ? "scale-110" : "scale-100"
            )}
            builder={imageUrlBuilder}
            image={image}
            width={windowWidth >= 1024 ? 650 : windowWidth >= 768 ? 450 : 250}
            alt={image?.alt || "image"}
          />
        </figure>
        <section className="| mx-5 flex -translate-y-[20%] transform items-center justify-center md:mx-0 md:translate-y-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: intersecting ? 1 : 0 }}
            viewport={{ once: true }}
            transition={{ type: "tween", duration: 0.7, ease: "easeInOut" }}
            className="bifrost__transparent_card flex flex-col space-y-2 rounded-lg p-6 lg:space-y-6 lg:p-12"
          >
            {/* <GradientTitle>{heading}</GradientTitle> */}
            {/* <Header>{title}</Header> */}
            <Description>{description}</Description>

            <div className="flex">
              <button className="space-x-4 py-2">
                <object
                  type="image/svg+xml"
                  height="64"
                  width="64"
                  data="play.svg"
                  className="inline-block"
                />
                <span className="text-[16px] leading-[16px] underline">
                  {ctaButton.title}
                </span>
              </button>
            </div>
          </motion.div>
        </section>
      </div>
    </article>
  );
};

export default About;
