import clsx from "clsx";
// import { GradientTitle } from 'src/components/common/GradientTitle'
// import { Heading } from 'components/ui/heading'
import { motion } from "framer-motion";
import { AgendaProps, ReasonSection } from "lib/@types/about-us-types";
import { useRef, useState } from "react";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder, PortableText } from "utils/sanity";
import { useIntersection } from "lib/hooks";

const Reason: React.FC<ReasonSection> = ({ agendas }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const intersecting = useIntersection(sectionRef, {
    threshold: 0.5,
  })?.isIntersecting;
  const [active, setActive] = useState(0);

  return (
    <section ref={sectionRef} className="mx-5">
      <div className="| | | relative z-10 mx-auto mb-16 flex max-w-5xl flex-col items-center space-y-7 lg:mb-20 lg:items-start lg:pt-16 xl:mb-40 2xl:max-w-5xl 3xl:max-w-6xl">
        {/* <GradientTitle>{title}</GradientTitle> */}
        <div className="| grid grid-cols-1 space-y-4 lg:grid-cols-2 lg:space-y-0">
          {/* <HeadingclassName="lg:text-left text-center">{subtitle}</Header> */}
          <div className="pb-5 lg:pb-0">
            <div className="| | | relative ml-auto flex w-full items-end justify-around lg:w-[60%] lg:justify-end">
              {agendas.map((reason, index) => (
                <div key={reason._key} className="w-full">
                  <div
                    className="relative z-10 flex w-full cursor-pointer items-center justify-center py-2 font-bold hover:opacity-75 lg:my-0"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setActive(index);
                    }}
                  >
                    <span
                      className={clsx(
                        active === index &&
                          "primary__gradient bg-clip-text text-transparent"
                      )}
                    >
                      {reason.name}
                    </span>
                    {active === index && (
                      <motion.div
                        className={clsx(
                          "absolute left-0 bottom-[-4px] z-10 h-[0.2em] w-full",
                          active === index && "primary__gradient"
                        )}
                        layoutId="underline"
                        initial={false}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </div>
                  <div
                    className={clsx(
                      "absolute left-0 bottom-[-4px] z-0 h-[0.2em] w-full bg-[#1E2531]"
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {!!agendas[active] && (
          <ActiveAgenda intersecting={intersecting} {...agendas[active]} />
        )}
      </div>
    </section>
  );
};

interface ActiveAgendaProps extends AgendaProps {
  intersecting: boolean;
}
const ActiveAgenda: React.FC<ActiveAgendaProps> = ({
  title,
  description,
  _key,
  image,
  intersecting,
}) => {
  return (
    <motion.article
      key={_key}
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      className="grid grid-cols-6 rounded-primary md:grid-cols-12"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: intersecting ? 1 : 0 }}
        viewport={{ once: true }}
        transition={{ type: "tween", duration: 0.7, ease: "easeInOut" }}
        className="bifrost__transparent__card col-span-6 mx-1 flex flex-col items-center justify-center space-y-5 rounded-l-[15px] p-6 sm:border-y sm:border-l sm:border-[#4e6181]/30 md:mx-0 lg:space-y-7 lg:p-12"
      >
        <h5 className="text-head-4-res font-primary leading-none lg:text-head-md">
          {title}
        </h5>
        <div className="text-body-1-mobile opacity-70 lg:text-body-1">
          <PortableText blocks={description} />
        </div>
      </motion.div>
      <figure className="| col-span-6 aspect-video h-full min-h-[280px] w-full -translate-y-5 !overflow-hidden sm:relative md:aspect-square md:-translate-x-5 md:-translate-y-0">
        <SanityImg
          className={clsx(
            "| top-0 left-0 h-full w-full rounded-primary object-cover object-center transition-opacity duration-700 ease-in-out sm:absolute",
            intersecting ? "opacity-100" : "opacity-0"
          )}
          builder={imageUrlBuilder}
          image={image}
          height={500}
          alt={image?.alt || "image"}
        />
      </figure>
    </motion.article>
  );
};

export default Reason;
