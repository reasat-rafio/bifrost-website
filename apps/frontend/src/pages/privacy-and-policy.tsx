import Hero from "components/privacy-policy/hero";
import { Policy } from "components/privacy-policy/policy";
import { siteQuery } from "lib/query";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { useCallback, useState } from "react";
import { renderObjectArray } from "sanity-react-extra";
import { sanityStaticProps, useSanityQuery } from "utils/sanity";

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "privacyPolicyPage"][0]
}`;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const PrivacyPolicy = (props: SanityProps<any>) => {
  const {
    data: {
      page: { sections },
    },
  } = useSanityQuery(query, props);

  return (
    <div className="relative">
      {renderObjectArray(sections, {
        "privacyPolicyPage.home": Hero,
        "privacyPolicyPage.policy": Policy,
      })}
    </div>
  );
};

export default PrivacyPolicy;
