// import { GradientTitle } from 'src/components/common/GradientTitle'
import { Description } from "components/ui/description";
import { Heading } from "components/ui/heading";
import { FeaturesProps } from "lib/@types/use-case-types";
import { useWindowSize } from "react-use";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "utils/sanity";
import { Button } from "components/ui/button";

const UseCaseFeatures: React.FC<FeaturesProps> = ({
  description,
  // heading,
  title,
  ctaButton,
  features,
}) => {
  const { width: windowWidth } = useWindowSize() ?? {
    width: 0,
    height: 0,
  };

  return (
    <section className="| | | container z-10 grid grid-cols-1 gap-8 pb-14 lg:grid-cols-2 lg:pb-20 xl:pb-44">
      <div className=" ifrost__transparent__card | | | flex flex-col justify-center space-y-2 rounded-primary border border-[#4e6181]/30 p-4 md:space-y-6 md:p-6 xl:p-14">
        {/* <GradientTitle>{heading}</GradientTitle> */}
        <Heading>{title}</Heading>
        <Description>{description}</Description>

        {!!ctaButton && (
          <div>
            <Button type="href" href={ctaButton.href ?? "/"}>
              {ctaButton.title}
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {features.map((item) => {
          return (
            <div className="bifrost__transparent__card | | group rounded-primary border border-[#4e6181]/20">
              <figure className="| | flex w-full justify-center overflow-hidden rounded-[8px]">
                <SanityImg
                  className="object-cover transition-all duration-300 group-hover:scale-110"
                  builder={imageUrlBuilder}
                  image={item.image}
                  alt={item.image?.alt || "image"}
                  height={windowWidth >= 768 ? 250 : 150}
                />
              </figure>
              <p className="py-3 text-center text-body-1-mobile md:text-body-2">
                {item.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UseCaseFeatures;
