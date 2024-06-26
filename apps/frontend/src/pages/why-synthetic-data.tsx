// import Contact  from "src/components/common/contact";
import Information from "components/common/information";
import { Hero, HeroProps } from "components/why-synthetic-data/hero";
import { CollectionBlock } from "components/common/header-and-card-collection-block";
import { Resume } from "components/why-synthetic-data/resume";
import { siteQuery } from "lib/query";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { useCallback, useState } from "react";
import { renderObjectArray, withDimensions } from "sanity-react-extra";
import { sanityStaticProps, useSanityQuery } from "utils/sanity";

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "whySyntheticDataPage"][0] {
    ...,
    sections[] {
      ...,
      "image": ${withDimensions("image")},
      collection[]{
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

const WhySyntheticData: React.FC<SanityProps> = (props) => {
  const {
    data: { page },
  } = useSanityQuery(query, props);
  const [heroSectionHeight, setHeroSectionHeight] = useState(0);

  return (
    <div className="relative">
      {renderObjectArray(page.sections, {
        "whySyntheticDataPage.hero": useCallback(
          (props: HeroProps) => (
            <Hero {...props} setHeroSectionHeight={setHeroSectionHeight} />
          ),
          []
        ),
      })}

      <div
        className="relative z-10 bg-black"
        style={{ marginTop: heroSectionHeight }}
      >
        {renderObjectArray(page.sections, {
          infoBlock: Information,
          headerAndcollectionOfItems: CollectionBlock,
          resume: Resume,
          // contact: Contact,
        })}
      </div>
    </div>
  );
};

export default WhySyntheticData;
