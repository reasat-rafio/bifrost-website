import { BlogsSection } from "lib/@types/blog-types";
import { formatDate, truncate } from "src/lib/helpers";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder, sanityClient } from "utils/sanity";
import { motion } from "framer-motion";
import { Button } from "components/ui/button";
import { firstPageBlogsQuery, nextPageBlogsQuery } from "lib/query";
import { PostSkeleton } from "./post-skeleton";

const cardsPerPage = 5;
const Posts: React.FC<BlogsSection> = ({ blogs, totalBlogs }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const windowWidth = useWindowSize()?.width ?? 0;
  const showShowMoreButton = totalBlogs > cardsPerPage;
  const [allBlogs, setAllBlogs] = useState(blogs);
  //? Last blog it is used for pagination. We set the last id blog id after each api call and next time we fetch after that list id
  const [lastBlogId, setLastBlogId] = useState<null | string>(null);
  const [lastPublishedAt, setLastPublishedAt] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const fetchNextBlogPage = async () => {
    try {
      const newBlogs = await sanityClient("anonymous").fetch(
        nextPageBlogsQuery({ lastBlogId, lastPublishedAt })
      );
      setLoading(true);
      setAllBlogs([...allBlogs, ...newBlogs]);
      setLastBlogId(newBlogs[newBlogs.length - 1]._id);
      setLastPublishedAt(newBlogs[newBlogs.length - 1]._createdAt);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFirstBlogPage = async () => {
    const blogs = await sanityClient("anonymous").fetch(firstPageBlogsQuery);
    setLoading(true);
    setAllBlogs(blogs);
    setLastBlogId(blogs[blogs.length - 1]._id);
    setLastPublishedAt(blogs[blogs.length - 1]._createdAt);
    try {
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const showMoreLessButtonAction = () => {
    if (allBlogs.length === totalBlogs) fetchFirstBlogPage();
    else fetchNextBlogPage();
  };

  useEffect(() => {
    setLastBlogId(blogs[blogs.length - 1]._id);
    setLastPublishedAt(blogs[blogs.length - 1]._createdAt);
  }, []);

  return (
    <section ref={sectionRef} className="| container relative py-12">
      <motion.div className="divide-y divide-[#1E2531]">
        {allBlogs.map(
          ({ _id, datetime, heading, slug, shortDescription, image }) => (
            <motion.article
              key={_id}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
              viewport={{ margin: "100px", once: true }}
              className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-2 lg:gap-20"
              ref={blogRef}
            >
              <figure className="max-h-[400px] w-full overflow-hidden rounded-[14px]">
                <SanityImg
                  className="h-full w-full object-cover"
                  builder={imageUrlBuilder}
                  image={image}
                  alt={image?.alt || "image"}
                  height={
                    windowWidth >= 1280 ? 450 : windowWidth >= 768 ? 300 : 150
                  }
                />
              </figure>
              <section className="| flex w-full flex-col items-start space-y-6 font-light">
                <span className="text-sm text-[#B9B9B9] sm:text-base">
                  {formatDate(datetime?.split("T")[0])}
                </span>
                <h6 className="text-3xl md:text-p-1">{heading}</h6>
                <p className="text-sm opacity-70 sm:text-base">
                  {truncate(shortDescription, 280)}
                </p>
                <Button
                  variant="secondary"
                  type="href"
                  href={`/post/${slug.current}`}
                >
                  Read More
                </Button>
              </section>
            </motion.article>
          )
        )}
        {Array.from({ length: 5 }).map((_, idx) => (
          <PostSkeleton key={idx} loading={loading} />
        ))}
      </motion.div>

      <span className="flex items-center justify-center">
        {showShowMoreButton && (
          <motion.div
            key={lastBlogId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
          >
            <Button
              disabled={loading}
              type="button"
              variant="primary"
              onClick={showMoreLessButtonAction}
            >
              {allBlogs.length === totalBlogs ? "Show Less" : "Show More"}
            </Button>
          </motion.div>
        )}
      </span>
    </section>
  );
};

export default Posts;
