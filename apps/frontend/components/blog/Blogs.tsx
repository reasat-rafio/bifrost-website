import { LoadMoreCard } from 'components/common/loaders/LoadMoreCard'
import Button from 'components/ui/Button'
import { BlogsSection } from 'lib/@types/blogTypes'
import { formatDate } from 'lib/helpers'
import { getMoreBlogListQuery } from 'lib/query'
import { ReactElement, useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder, sanityClient } from 'utils/sanity'

export default function Blogs({ blogs, totalBlogs }: BlogsSection): ReactElement {
  const { width: windowWidth } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  const [blogList, setBlogList] = useState(blogs)
  const [upComingBlogLength, setUpcomingBlogLength] = useState<null | number>(null)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(2)

  const listLimit = 5

  const onShowMoreAction = async () => {
    if (totalBlogs > blogs.length) {
      setPage((prev) => prev + 1)

      try {
        setLoading(true)
        const query = getMoreBlogListQuery({
          limit: +listLimit,
          page: +page,
        })

        const result = await sanityClient('anonymous').fetch(query)

        setBlogList((prev) => [...prev, ...result])
      } catch (err) {
        console.log(JSON.stringify(err, ['message', 'arguments', 'type', 'name']))
      } finally {
        setLoading(false)
      }
    } else {
      setPage(2)
      setBlogList(blogs.slice(0, listLimit))
    }
  }

  useEffect(() => {
    setUpcomingBlogLength(
      totalBlogs - blogList.length >= listLimit ? listLimit : totalBlogs - blogList.length,
    )
  }, [blogList, totalBlogs])

  return (
    <section className="relative">
      <div className="container pt-12 divide-y divide-[#1E2531]">
        {blogList.map(({ _id, detetime, heading, slug, subHeading, image }) => {
          const date = formatDate(detetime.split('T')[0])

          return (
            <>
              {!loading ? (
                <div
                  key={_id}
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
                      <Button>
                        <a href={slug.current}>Load More</a>
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                Array.from({ length: 5 as number }).map((_, idx) => (
                  <LoadMoreCard key={idx} uniqueKey={`on-selling-${idx}`} />
                ))
              )}
            </>
          )
        })}
      </div>
      <span className="flex justify-center items-center">
        <span>
          <Button disabled={loading} onClick={onShowMoreAction}>
            {totalBlogs <= blogList.length ? 'Less' : `${upComingBlogLength} More`} articles
          </Button>
        </span>
      </span>
    </section>
  )
}
