import { Description } from "components/ui/description";
import { Heading } from "components/ui/heading";
import { Section } from "components/ui/section";
import { Title } from "components/ui/title";
import { CTAButton } from "lib/@types/global-types";
import { useWindowSize } from "lib/hooks";
import { useMemo } from "react";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "utils/sanity";

interface InfoProps {
  type: string;
  title?: string;
  heading?: string;
  description: string;
  image: SanityImage;
  cta?: CTAButton;
}

const Info: React.FC<InfoProps> = ({ description, image, title, heading }) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const imageWidth = useMemo(
    () => (windowWidth >= 1280 ? 1200 : windowWidth > 768 ? 700 : 400),
    [windowWidth]
  );
  return (
    <Section>
      <article className="spacing_primary flex flex-col-reverse font-light md:flex-col">
        <figure className="mt-8 md:mt-0">
          <SanityImg
            className="h-full max-h-[460px] w-full rounded-primary object-cover"
            image={image}
            alt={image.alt}
            builder={imageUrlBuilder}
            width={imageWidth}
          />
        </figure>
        <section className="spacing_primary">
          {!!title && <Title>{title}</Title>}
          {!!heading && <Heading>{heading}</Heading>}
          {!!description && <Description>{description}</Description>}
        </section>
      </article>
    </Section>
  );
};

export default Info;
