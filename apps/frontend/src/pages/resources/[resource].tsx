import { Article } from "components/[resource]/article/article";
import { Form } from "components/[resource]/form";
import { siteQuery } from "lib/query";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { useRef } from "react";
import { withDimensions } from "sanity-react-extra";
import { sanityClient, sanityStaticProps, useSanityQuery } from "utils/sanity";

const query = groq`{
  "site": ${siteQuery},
  "page": *[_type == "resource" && slug.current == $resource][0] {
    ...,
    "image": ${withDimensions("image")},
    body[]{
      ...,
      asset->{
        ...,
        metadata {
          dimensions
        }
      }
    }
   "relatedResources" : *[_type== "resource" && slug.current != $resource && count((tags[]->name)[@ in ^.tags[]->.name]) > 0][]{
      _id,
      heading,
      slug,
      datetime,
      shortDescription,
      "image": ${withDimensions("image")},
    }
  }
}`;

const pathsQuery = groq`*[_type == 'resource'][]{
  slug,
  tags[]->{
    name
    }
  }`;

export const getStaticPaths = async () => {
  const slugs = await sanityClient("anonymous").fetch(pathsQuery);

  return {
    paths: slugs
      .filter((s: any) => s)
      .map((s: any) => ({
        params: { resource: s.slug.current, tags: s.tags },
      })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: { darkNavbar: true, ...(await sanityStaticProps({ context, query })) },
  revalidate: 10,
});

const Resources = (props: SanityProps<any>) => {
  const {
    data: { page },
  } = useSanityQuery(query, props);
  const articleRef = useRef(null);
  console.log(page.body);

  return (
    <div className="container">
      <Article body={page.body} ref={articleRef} />
      <Form />
    </div>
  );
};

export default Resources;
