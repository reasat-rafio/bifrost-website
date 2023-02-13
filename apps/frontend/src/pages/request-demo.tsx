import { Form } from "components/request-demo/form";
import Hero from "components/request-demo/hero";
import { siteQuery } from "lib/query";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
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

  return (
    <div>
      {renderObjectArray(sections, {
        "requestDemoPage.home": Hero,
      })}
      <Form className="my-10 block lg:hidden" />
    </div>
  );
};

export default RequestDemo;
