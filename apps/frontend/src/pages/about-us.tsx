import About from "components/about/about";
import Hero from "components/about/hero";
import Reason from "components/about/reason";
import Team from "components/about/team";
import { siteQuery } from "src/lib/query";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { renderObjectArray, withDimensions } from "sanity-react-extra";
import { sanityStaticProps, useSanityQuery } from "utils/sanity";
import { useCallback, useState } from "react";
import { HomeProps } from "lib/@types/about-us-types";
import { Contact } from "components/common/contact";
import { Client } from "components/common/client";
import { Newsletter } from "components/common/newsletter";

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "aboutUsPage"][0] {
    ...,
    sections[] {
      ...,
      "image": ${withDimensions("image")},
      agenda{
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
  },
}`;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

export default function AboutUs(props: SanityProps<any>) {
  const {
    data: {
      page: { sections, cleint },
    },
  } = useSanityQuery(query, props);

  const [heroSectionHeight, setHeroSectionHeight] = useState(0);
  return (
    <div>
      {renderObjectArray(sections, {
        "aboutUs.home": useCallback(
          (p: HomeProps) => (
            <Hero setHeroSectionHeight={setHeroSectionHeight} {...p} />
          ),
          []
        ),
      })}
      <div
        className="bg-black"
        style={{
          transform: `translate(0, ${heroSectionHeight}px)`,
          marginBottom: heroSectionHeight,
        }}
      >
        {renderObjectArray(sections, {
          "aboutUs.about": About,
          "aboutUs.reason": Reason,
        })}
        <Client {...cleint} />
        {renderObjectArray(sections, {
          contact: Contact,
        })}
      </div>
    </div>
  );
}
