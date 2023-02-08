import { SanityAsset } from "@sanity/image-url/lib/types/types";
import Hero from "components/thank-you/hero";
import { CTAButton, SEO } from "lib/@types/global-types";
import { siteQuery } from "lib/query";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { useState } from "react";
import { withDimensions } from "sanity-react-extra";
import { sanityStaticProps, useSanityQuery } from "utils/sanity";

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "thankYouPage"][0] {
    ...,
    "icon": ${withDimensions("icon")},
  }
}`;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const ThankYou = (props: SanityProps<any>) => {
  const {
    data: { page },
  } = useSanityQuery(query, props);
  const [heroSectionHeight, setHeroSectionHeight] = useState(0);
  return (
    <>
      <Hero setHeroSectionHeight={setHeroSectionHeight} {...page} />
      <div
        className="relative z-20 bg-black"
        style={{ marginTop: heroSectionHeight }}
      />
    </>
  );
};

export default ThankYou;
