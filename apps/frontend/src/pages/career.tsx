import About from "components/career/about";
import Info from "components/career/info";
import WhyUs from "components/career/why-us";
import Client from "components/common/client";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { useCallback, useState } from "react";
import { renderObjectArray, withDimensions } from "sanity-react-extra";
import Hero from "src/components/career/hero";
import Contact from "src/components/common/contact";
import { siteQuery } from "src/lib/query";
import { sanityStaticProps, useSanityQuery } from "utils/sanity";

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "careerPage"][0] {
    ...,
    sections[] {
      ...,
      "image": ${withDimensions("image")},
      collection[]{
        ...,
        "image": ${withDimensions("image")},
      },
    },
    "cleint" : *[_id == "client"][0] {
      ...,
      clients[]{
        ...,
        "logo": ${withDimensions("logo")},
      },
    },
  }
}`;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const Career = (props: SanityProps<any>) => {
  const {
    data: {
      page: { sections, cleint },
    },
  } = useSanityQuery(query, props);
  const [heroSectionHeight, setHeroSectionHeight] = useState(0);

  return (
    <div className="relative">
      {renderObjectArray(sections, {
        "careerPage.hero": useCallback(
          (props: any) => (
            <Hero {...props} setHeroSectionHeight={setHeroSectionHeight} />
          ),
          []
        ),
      })}

      <div
        className="relative z-10 bg-black"
        style={{ marginTop: heroSectionHeight }}
      >
        {renderObjectArray(sections, {
          infoBlock: Info,
          "careerPage.about": About,
          "careerPage.whyUs": WhyUs,
        })}
        <Client {...cleint} />
        {renderObjectArray(sections, {
          contact: Contact,
        })}
      </div>
    </div>
  );
};

export default Career;
