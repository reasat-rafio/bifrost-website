import { BlogsSection } from 'lib/@types/blog-types'
import { formatDate, truncate } from 'src/lib/helpers'
import { useEffect, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'
import { motion } from 'framer-motion'
import { Button } from 'components/ui/button'

const cardsPerPage = 5
const Posts: React.FC<BlogsSection> = ({ blogs, totalBlogs }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const blogRef = useRef<HTMLDivElement>(null)
  const windowWidth = useWindowSize()?.width ?? 0
  const [sortedBlogs, setSortedBlogs] = useState(blogs)
  const [page, setPage] = useState(1)

  const showShowMoreButton = totalBlogs > cardsPerPage
  const showMoreLessButtonAction = () => {
    if (sortedBlogs.length < totalBlogs) setPage(page + 1)
    else {
      sectionRef.current.scrollIntoView()
      setPage(1)
    }
  }
  useEffect(() => {
    setSortedBlogs(blogs.slice(0, cardsPerPage * page))
  }, [page])

  return (
    <section ref={sectionRef} className="relative container | py-12">
      <motion.div className="divide-y divide-[#1E2531]">
        {sortedBlogs.map(({ _id, datetime, heading, slug, shortDescription, image }) => (
          <motion.article
            key={_id}
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ type: 'tween', duration: 0.5, ease: 'easeInOut' }}
            viewport={{ margin: '100px', once: true }}
            className="grid lg:grid-cols-2 grid-cols-1 py-16 lg:gap-20 gap-10"
            ref={blogRef}
          >
            <figure className="w-full max-h-[400px] rounded-[14px] overflow-hidden">
              <SanityImg
                className="w-full h-full object-cover"
                builder={imageUrlBuilder}
                image={image}
                alt={image?.alt || 'image'}
                height={windowWidth >= 1280 ? 450 : windowWidth >= 768 ? 300 : 150}
              />
            </figure>
            <section className="w-full flex flex-col items-start space-y-6 | font-light">
              <span className="sm:text-base text-sm text-[#B9B9B9]">
                {formatDate(datetime?.split('T')[0])}
              </span>
              <h6 className="md:text-[36px] text-3xl">{heading}</h6>
              <p className="sm:text-base text-sm opacity-70">{truncate(shortDescription, 280)}</p>
              <Button variant="secondary" type="href" href={`/post/${slug.current}`}>
                Read More
              </Button>
            </section>
          </motion.article>
        ))}
        {/* 
        {loading &&
          Array.from({ length: upComingBlogLength as number }).map((_, idx) => (
            <LoadMoreCard key={idx} uniqueKey={`list-${idx}`} />
          ))} */}
      </motion.div>

      <span className="flex justify-center items-center">
        {showShowMoreButton && (
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'tween', duration: 0.6, ease: 'easeInOut' }}
          >
            <Button type="button" variant="primary" onClick={showMoreLessButtonAction}>
              {sortedBlogs.length === totalBlogs ? 'Show Less' : 'Show More'}
            </Button>
          </motion.div>
        )}
      </span>
    </section>
  )
}

export default Posts
