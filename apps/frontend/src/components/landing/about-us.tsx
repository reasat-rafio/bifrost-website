import { Description } from "components/ui/description";
import { Heading } from "components/ui/heading";
import { Section } from "components/ui/section";
import { Title } from "components/ui/title";
import { AboutCollection } from "lib/@types/landing-types";
import { useWindowSize } from "lib/hooks";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { PortableText, imageUrlBuilder } from "utils/sanity";
import { motion } from "framer-motion";

interface AboutUsProps {
  type: string;
  collection: AboutCollection[];
}

const AboutUs: React.FC<AboutUsProps> = ({ collection }) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const LgScreen = windowWidth >= 1024;

  return (
    <Section borderBottom={false}>
      <div className="space-y-14 sm:space-y-20">
        {collection.map(
          ({ _key, description, heading, image, title }, index) => (
            <article
              key={_key}
              className="flex flex-col-reverse gap-10 lg:flex-row lg:gap-20"
            >
              {LgScreen ? (
                <>
                  {index % 2 !== 0 ? (
                    <>
                      <DescriptionBlock
                        description={description}
                        heading={heading}
                        title={title}
                        index={index}
                      />
                      <ImageBlock
                        windowWidth={windowWidth}
                        index={index}
                        image={image}
                      />
                    </>
                  ) : (
                    <>
                      <ImageBlock
                        windowWidth={windowWidth}
                        index={index}
                        image={image}
                      />
                      <DescriptionBlock
                        description={description}
                        heading={heading}
                        index={index}
                        title={title}
                      />
                    </>
                  )}
                </>
              ) : (
                <>
                  <ImageBlock
                    windowWidth={windowWidth}
                    index={index}
                    image={image}
                  />
                  <DescriptionBlock
                    description={description}
                    heading={heading}
                    index={index}
                    title={title}
                  />
                </>
              )}
            </article>
          )
        )}
      </div>
    </Section>
  );
};

interface IDescriptionBlock {
  title?: string;
  heading: string;
  description: any;
  index: number;
}
const DescriptionBlock: React.FC<IDescriptionBlock> = ({
  title,
  description,
  heading,
  index,
}) => {
  return (
    <section className="spacing_primary flex-1 font-light">
      {!!title && <Title el="h3">{title}</Title>}
      {index === 0 ? (
        <Heading className="text-[#FCF9FF]" el="h2">
          {heading}
        </Heading>
      ) : (
        <Heading className="text-[#FCF9FF]" variant="small" el="h3">
          {heading}
        </Heading>
      )}

      <Description
        type="div"
        variant="small"
        className="prose-sm max-w-none prose-ul:m-0 prose-ul:p-0"
      >
        <PortableText
          blocks={description}
          serializers={{
            listItem: ({ children }: any) => {
              return (
                <li className="">
                  <div className="mb-5 flex space-x-3">
                    <span
                      style={{
                        transform: `matrix(0.69, 0.72, -0.69, 0.72, 0, 0)`,
                      }}
                      className="mt-[10px] h-3 w-3 rounded-[4px] bg-[#B794FF] sm:h-[15.18px] sm:w-[15.18px]"
                    />
                    <span className="flex-1">{children}</span>
                  </div>
                </li>
              );
            },
          }}
        />
      </Description>
    </section>
  );
};

interface IImageBlock {
  image: SanityImage;
  index: number;
  windowWidth: number;
}
const ImageBlock: React.FC<IImageBlock> = ({ image, windowWidth }) => {
  return (
    <motion.figure className="flex-1">
      <SanityImg
        className="h-full w-full rounded-primary object-cover"
        width={windowWidth >= 1280 ? 900 : windowWidth >= 640 ? 500 : 300}
        image={image}
        builder={imageUrlBuilder}
        alt={image.alt}
      />
    </motion.figure>
  );
};

export default AboutUs;
