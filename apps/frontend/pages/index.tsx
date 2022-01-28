import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import Navbar from "components/Navbar";
import { siteQuery } from "lib/query";
import type { GetStaticProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "landingPage"][0] {
    ...,
  },
}`;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

export default function Home(
  props: SanityProps<{ site: Site; page: LandingPage }>
) {
  const {
    data: { site },
  } = useSanityQuery(query, props);

  return (
    <div>
      <Navbar logo={site.logo} menu={site.nav.menu} />
    </div>
  );
}
