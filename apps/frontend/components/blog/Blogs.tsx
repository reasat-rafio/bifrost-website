import { LoadMoreCard } from 'components/common/loaders/LoadMoreCard'
import Button from 'components/ui/Button'
import { BlogsSection } from 'lib/@types/blogTypes'
import { formatDate } from 'lib/helpers'
import { useScroll } from 'lib/hooks'
import { getMoreBlogListQuery } from 'lib/query'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder, sanityClient } from 'utils/sanity'
import { motion } from 'framer-motion'

const staggerContainer = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.3,
    },
  },
}

const staggerChild = {
  from: {
    scale: 0.8,
    opacity: 0,
  },
  to: {
    scale: 1,
    opacity: 1,
  },
}

export default function Blogs({ blogs, totalBlogs }: BlogsSection): ReactElement {
  const windowWidth = useWindowSize()?.width ?? 0

  const [executeScroll, elRef] = useScroll()
  const blogRef = useRef<HTMLDivElement>(null)

  const router = useRouter()

  const [blogList, setBlogList] = useState(blogs)
  const [upComingBlogLength, setUpcomingBlogLength] = useState<null | number>(null)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(2)
  console.log(blogList)

  const scrollToBottom = () => {
    const domNode = blogRef.current
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight
    }
  }

  const listLimit = 5

  const onShowMoreAction = async () => {
    if (totalBlogs > blogList.length) {
      setLoading(true)
      setPage((prev) => prev + 1)

      try {
        const query = getMoreBlogListQuery({
          limit: +listLimit,
          page: +page,
        })

        const result = await sanityClient('anonymous').fetch(query)

        setBlogList((prev) => [...prev, ...result])
      } catch (err) {
        console.log(JSON.stringify(err, ['message', 'arguments', 'type', 'name']))
      } finally {
        scrollToBottom()
        setLoading(false)
      }
    } else {
      executeScroll()
      setPage(2)
      setBlogList(blogList.slice(0, listLimit))
    }
  }

  useEffect(() => {
    setUpcomingBlogLength(
      totalBlogs - blogList.length >= listLimit ? listLimit : totalBlogs - blogList.length,
    )
  }, [blogList, totalBlogs])

  return (
    <section className="relative container">
      <motion.div
        key={blogList.length}
        className="pt-12 divide-y divide-[#1E2531]"
        variants={staggerContainer}
        initial="from"
        animate="to"
        ref={elRef}
      >
        {blogList.map(({ _id, datetime, heading, slug, subHeading, image }) => {
          const date = formatDate(datetime?.split('T')[0])

          return (
            <div ref={blogRef}>
              {!loading && (
                <motion.div
                  key={_id}
                  variants={staggerChild}
                  className="grid lg:grid-cols-2 grid-cols-1 py-16 lg:gap-20 gap-10 group"
                >
                  <div className="w-full max-h-[400px] rounded-[14px] overflow-hidden  ">
                    <SanityImg
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                      builder={imageUrlBuilder}
                      image={image}
                      alt={image?.alt || 'image'}
                      height={windowWidth >= 768 ? 300 : 150}
                    />
                  </div>
                  <div className="w-full flex flex-col items-start space-y-6">
                    <span className="text-[14px] leading-[26px] text-[#B9B9B9]">{date}</span>
                    <h6 className="text-[36px] leading-[43.2px]">{heading}</h6>
                    <p className="text-[14px] leading-[26px] opacity-70">{subHeading}</p>
                    <div>
                      <Button onClick={() => router.push(`/blog/${slug.current}`)}>
                        Load More
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )
        })}

        {loading &&
          Array.from({ length: upComingBlogLength as number }).map((_, idx) => (
            <LoadMoreCard key={idx} uniqueKey={`list-${idx}`} />
          ))}
      </motion.div>

      <span className="flex justify-center items-center">
        <span>
          <Button disabled={loading} onClick={onShowMoreAction}>
            Show {totalBlogs <= blogList.length ? 'Less' : `${upComingBlogLength} More`} articles
          </Button>
        </span>
      </span>
    </section>
  )
}
