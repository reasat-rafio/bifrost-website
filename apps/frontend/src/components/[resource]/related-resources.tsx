import { SanityAsset } from "@sanity/image-url/lib/types/types";
import { Section } from "components/ui/section";
import { Title } from "components/ui/title";
import { Slug } from "lib/@types/dataset-types";
import { useIntersection, useWindowSize } from "lib/hooks";
import { MouseEvent, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "utils/sanity";
import Link from "next/link";
import { VFadeInOut } from "animations/fade-in-out";
import { truncate } from "lib/helpers";

interface RelatedResourcesProps {
  _id: string;
  heading: string;
  image: SanityAsset;
  shortDescription: string;
  slug: Slug;
}

export const RelatedResources: React.FC<{
  resources: RelatedResourcesProps[];
}> = ({ resources }) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const sectionRef = useRef(null);
  const intersecting =
    useIntersection(sectionRef, { threshold: 0.3 })?.isIntersecting ?? false;

  const imageWidth = useMemo(
    () => (windowWidth >= 1280 ? 400 : windowWidth > 768 ? 300 : 250),
    [windowWidth]
  );

  const onMouseMoveAction = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    const cards = document.getElementsByClassName(
      "card"
    ) as HTMLCollectionOf<HTMLDivElement>;

    for (const card of Array.from(cards)) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <Section ref={sectionRef}>
      <Title
        className="text-center"
        animate={{ delay: 0.1, show: intersecting }}
      >
        Other resources
      </Title>

      <motion.div
        onMouseMove={onMouseMoveAction}
        className="cards mt-8 grid grid-cols-12 gap-5 sm:mt-16"
      >
        {resources.map((data, index) => (
          <Resource
            key={data._id}
            index={index}
            intersecting={intersecting}
            imageWidth={imageWidth}
            {...data}
          />
        ))}
      </motion.div>
    </Section>
  );
};

interface ResourceProps extends RelatedResourcesProps {
  index: number;
  intersecting: boolean;
  imageWidth: number;
}
const Resource: React.FC<ResourceProps> = ({
  _id,
  index,
  image,
  slug,
  heading,
  imageWidth,
  intersecting,
  shortDescription,
}) => {
  return (
    <Link passHref href={`/resources/${slug.current}`}>
      <motion.a
        key={_id}
        className="card col-span-12 h-[400px] md:col-span-6 xl:col-span-4"
        initial="from"
        animate={intersecting ? "to" : "exit"}
        variants={VFadeInOut({ delay: 0.2 + index * 0.08 })}
      >
        <article className="card-content space-y-3 p-3 font-light">
          <figure className="h-[220px]">
            <SanityImg
              className="h-full w-full rounded-primary object-cover"
              image={image}
              builder={imageUrlBuilder}
              alt={image?.alt}
              width={imageWidth}
            />
          </figure>
          <h6 className="text-body-2">{heading}</h6>
          <p className="text-body-1-mobile opacity-70">
            {truncate(shortDescription, 200)}
          </p>
        </article>
      </motion.a>
    </Link>
  );
};
