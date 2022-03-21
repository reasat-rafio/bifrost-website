import Button from 'components/ui/Button'
import { ArticlesSection } from 'lib/blogTypes'
import { ReactElement } from 'react'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

export default function Blogs(props: ArticlesSection): ReactElement {
  const { width: windowWidth } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }
  console.log('====================================')
  console.log(props)
  console.log('====================================')
  return (
    <section className="relative ">
      {/* <div className="container pt-12 divide-y divide-[#1E2531] ">
        {articles.map((article) => (
          <div
            key={article._key}
            className="grid lg:grid-cols-2 grid-cols-1 py-16 lg:gap-20 gap-10 group"
          >
            <div className="w-full h-full rounded-[14px] overflow-hidden  ">
              <SanityImg
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                builder={imageUrlBuilder}
                image={article.image}
                alt={article.image?.alt || 'image'}
                height={windowWidth >= 768 ? 300 : 150}
              />
            </div>
            <div className="w-full flex flex-col items-start space-y-6">
              <span className="text-[14px] leading-[26px] text-[#B9B9B9]">
                {article.subHeadline}
              </span>
              <h6 className="text-[36px] leading-[43.2px]">{article.headline}</h6>
              <p className="text-[14px] leading-[26px] opacity-70">{article.body}</p>
              <div>
                <Button>
                  <a href={article.ctaButton.href}>{article.ctaButton.title}</a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <span className="flex justify-center items-center">
        <span>
          <Button>More articles</Button>
        </span>
      </span> */}
    </section>
  )
}
