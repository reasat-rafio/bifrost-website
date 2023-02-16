import Contact from "src/components/common/contact";
import { Hero, HeroProps } from "components/common/primary-hero";
import { Newsletter } from "components/common/newsletter";
import { siteQuery } from "lib/query";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { useCallback, useState } from "react";
import { renderObjectArray, withDimensions } from "sanity-react-extra";
import { useSanityQuery, sanityStaticProps } from "utils/sanity";
// import { ProjectsBlock } from "components/common/projects-block";

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "hardwareTestingPage"][0] {
    ...,
    sections[] {
      ...,
      "image": ${withDimensions("image")},
      projects[]{
        ...,
      "image": ${withDimensions("image")},
      }
    },
  }
}`;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const HardwareTesting = (props: SanityProps<any>) => {
  const {
    data: { page },
  } = useSanityQuery(query, props);
  const [heroSectionHeight, setHeroSectionHeight] = useState(0);

  return (
    <>
      {renderObjectArray(page.sections, {
        primaryHero: useCallback(
          (props: HeroProps) => (
            <Hero {...props} setHeroSectionHeight={setHeroSectionHeight} />
          ),
          []
        ),
      })}

      <div
        className="relative z-20 bg-black"
        style={{ marginTop: heroSectionHeight }}
      >
        {renderObjectArray(page.sections, {
          // projects: ProjectsBlock,
          newsletter: Newsletter,
          contact: Contact,
        })}
      </div>
    </>
  );
};

export default HardwareTesting;
