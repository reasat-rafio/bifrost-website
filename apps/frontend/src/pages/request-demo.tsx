import Hero from "components/request-demo/hero";
import { siteQuery } from "lib/query";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { useCallback, useState } from "react";
import { renderObjectArray } from "sanity-react-extra";
import { sanityStaticProps, useSanityQuery } from "utils/sanity";

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "requestDemoPage"][0]
}`;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const RequestDemo = (props: SanityProps<any>) => {
  const {
    data: {
      page: { sections },
    },
  } = useSanityQuery(query, props);

  const [heroSectionHeight, setHeroSectionHeight] = useState(0);

  return (
    <div>
      {renderObjectArray(sections, {
        "requestDemoPage.home": useCallback(
          (props: any) => (
            <Hero {...props} setHeroSectionHeight={setHeroSectionHeight} />
          ),
          []
        ),
      })}
      <div
        className="relative z-10 bg-midnight-blue"
        style={{ marginTop: heroSectionHeight }}
      />
    </div>
  );
};

export default RequestDemo;
