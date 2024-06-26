import { Heading } from "components/[blog]/heading";
import { PrimaryWrapper } from "components/common/primary-wapper";
// import Newslettr from 'components/common/newsletter'
import { BlogProps } from "lib/@types/blog-types";
import { siteQuery } from "src/lib/query";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { renderObjectArray, withDimensions } from "sanity-react-extra";
import { sanityClient, sanityStaticProps, useSanityQuery } from "utils/sanity";
// import Ellipse from 'src/components/Ellipse'
import { RelatedBlogs } from "components/[blog]/related-blog";
import Contact from "components/common/contact";
import { Newsletter } from "components/common/newsletter";
import { ScrollDetective } from "components/common/scroll-detective";
import { useIntersection } from "lib/hooks";
import { useScroll } from "framer-motion";
import { Body } from "components/[blog]/body/body";

const query = groq`{
  "site": ${siteQuery},
  "blog": *[_type== "blog" && slug.current == $post] [0] {
    ...,
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
    tags[]->,
    "relatedBlogs" : *[_type== "blog" && slug.current != $post && count((tags[]->name)[@ in ^.tags[]->.name]) > 0][]{
      _id,
      heading,
      slug,
      datetime,
      shortDescription,
      "image": ${withDimensions("image")},
    }
  },
  "page": *[_id == "blogDetailsPage"][0] {
    ...,
  },
}`;

const pathsQuery = groq`*[_type == 'blog'][]{
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
      .map((s: any) => ({ params: { post: s.slug.current, tags: s.tags } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: { darkNavbar: true, ...(await sanityStaticProps({ context, query })) },
  revalidate: 10,
});

export default function Blog(props: SanityProps) {
  const {
    data: {
      blog: { heading, datetime, body, relatedBlogs },
      page: { sections },
    },
  }: { data: { blog: BlogProps; page: any } } = useSanityQuery(query, props);
  const articleRef = useRef<HTMLElement>(null);
  const [paddingY, setPaddingY] = useState(0);
  const articleIntersecting = useIntersection(articleRef)?.isIntersecting;

  const { scrollYProgress } = useScroll({
    target: articleRef,
  });
  useLayoutEffect(() => {
    const navHeight = document.querySelector("#navbar").clientHeight;
    setPaddingY(navHeight * 2);
  }, []);

  return (
    <div>
      <ScrollDetective
        intersecting={articleIntersecting}
        scrollYProgress={scrollYProgress}
      />
      <article ref={articleRef} className="my-32 h-full bg-white px-6">
        <Heading heading={heading} datetime={datetime} />
        <Body paddingY={paddingY} body={body} />
      </article>
      <PrimaryWrapper>
        {renderObjectArray(sections, {
          newsletter: useCallback(
            (data: any) => <Newsletter {...data} padding="top-and-bottom" />,
            []
          ),
        })}
        <RelatedBlogs relatedBlogs={relatedBlogs} />
        {renderObjectArray(sections, {
          contact: Contact,
        })}
      </PrimaryWrapper>
      {/* <>
        <Ellipse className="z-10 absolute top-[20vh] right-[15vw] w-[153px] h-[391px]" />
        <Ellipse className="z-10 absolute top-[0vh] right-[40vw] w-[353px] h-[391px]" />
        <Ellipse className="z-10 absolute top-[20vh] right-[15vw] w-[153px] h-[391px]" />
      </> */}
    </div>
  );
}
