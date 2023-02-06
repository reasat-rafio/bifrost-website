import { Form } from "components/[resource]/form";
import { siteQuery } from "lib/query";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { useRef } from "react";
import { withDimensions } from "sanity-react-extra";
import { sanityClient, sanityStaticProps, useSanityQuery } from "utils/sanity";
import { ScrollDetective } from "components/common/scroll-detective";
import { useIntersection } from "lib/hooks";
import { useScroll } from "framer-motion";
import { RelatedResources } from "components/[resource]/related-resources";
import { Article } from "components/[resource]/article";

const query = groq`{
  "site": ${siteQuery},
  "page": *[_type == "resource" && slug.current == $resource][0] {
    ...,
    tags[]->,
    "image": ${withDimensions("image")},
    body[]{
      ...,
      "image": ${withDimensions("image")},
      description[]{
        ...,
        asset->{
            ...,
            metadata {
              dimensions
            }
        }
      }
    },
   "relatedResources" : *[_type== "resource" && slug.current != $resource && count((tags[]->name)[@ in ^.tags[]->.name]) > 0][]{
      _id,
      heading,
      slug,
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
    fallback: "blocking",
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
    data: {
      page: { heading, body, relatedResources },
    },
  } = useSanityQuery(query, props);
  const articleRef = useRef(null);

  const articleIntersecting = useIntersection(articleRef, {
    threshold: 0.05,
  })?.isIntersecting;
  const { scrollYProgress } = useScroll({
    target: articleRef,
  });

  return (
    <section>
      <ScrollDetective
        intersecting={articleIntersecting}
        scrollYProgress={scrollYProgress}
      />
      <Article
        ref={articleRef}
        intersecting={articleIntersecting}
        heading={heading}
        body={body}
      />
      <Form />
      <RelatedResources resources={relatedResources} />
    </section>
  );
};

export default Resources;
