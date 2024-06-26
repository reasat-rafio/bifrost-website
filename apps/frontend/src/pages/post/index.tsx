// import BlogArticles from 'components/blog/BlogArticles'
import Home from "components/post/home";
import { PrimaryWrapper } from "components/common/primary-wapper";
// import Ellipse from 'src/components/Ellipse'
import { BlogPage, HomeSection, IBlog } from "lib/@types/blog-types";
import { siteQuery } from "src/lib/query";
import { Site } from "lib/@types/global-types";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { useCallback, useState } from "react";
import { renderObjectArray, withDimensions } from "sanity-react-extra";
import { sanityStaticProps, useSanityQuery } from "utils/sanity";
import Contact from "components/common/contact";
import { Newsletter } from "components/common/newsletter";
import Posts from "components/post/posts";

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "blogPage"][0] {
    ...,
  },
  "blogs": *[_type== "blog"] | order(_createdAt) [0...5] {
    _id,
    _createdAt,
    heading,
    slug,
    datetime,
    shortDescription,
    "image": ${withDimensions("image")},
  },
  "totalBlogs": length(*[_type== "blog"]),
}`;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

export default function Blog(
  props: SanityProps<{
    site: Site;
    page: BlogPage;
    blogs: IBlog[];
    totalBlogs: number;
  }>
) {
  const {
    data: {
      page: { sections },
      blogs,
      totalBlogs,
    },
  } = useSanityQuery(query, props);
  const [heroSectionHeight, setHeroSectionHeight] = useState(0);

  return (
    <div>
      <PrimaryWrapper>
        {renderObjectArray(sections, {
          "blog.home": useCallback(
            (p: HomeSection) => (
              <Home setHeroSectionHeight={setHeroSectionHeight} {...p} />
            ),
            []
          ),
        })}
      </PrimaryWrapper>
      <div
        className="bg-black"
        style={{
          transform: `translate(0, ${heroSectionHeight}px)`,
          marginBottom: heroSectionHeight,
        }}
      >
        <PrimaryWrapper>
          {!!blogs.length && <Posts blogs={blogs} totalBlogs={totalBlogs} />}
          {renderObjectArray(sections, {
            newsletter: Newsletter,
            contact: Contact,
          })}
        </PrimaryWrapper>
      </div>
    </div>
  );
}
