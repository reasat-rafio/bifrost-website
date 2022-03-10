import Button from 'components/ui/Button'
import { ArticlesSection } from 'lib/blogTypes'
import { ReactElement } from 'react'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

export default function AboutClients(data: ArticlesSection): ReactElement {
  console.log({ data })
  const { width: windowWidth } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  return (
    <div className="relative container py-32 flex flex-col items-center space-y-4">
      <div className="grid grid-cols-12 gap-x-[50px] gap-y-28 py-12">
        {data.articles.map((article, index) => (
          <>
            <div className="col-span-12 grid grid-cols-12 gap-28">
              <div className="col-span-6 w-full">
                <SanityImg
                  className="w-full h-full md:object-contain object-cover"
                  builder={imageUrlBuilder}
                  image={article.image}
                  alt={article.image?.alt || 'image'}
                  height={windowWidth >= 768 ? 120 : 70}
                />
              </div>
              <div className="col-span-6 w-full flex flex-col items-start space-y-4">
                <div className="text-[14px] leading-[26px] text-[#B9B9B9]">
                  {article.subHeadline}
                </div>
                <div className="text-[36px] leading-[43.2px]">{article.headline}</div>
                <div className="text-[14px] leading-[26px]">{article.body}</div>
                <Button color="secondary">
                  <a href={article.ctaButton.href}>{article.ctaButton.title}</a>
                </Button>
              </div>
            </div>
            {data.articles.length !== index + 1 && (
              <hr className="col-span-12 text-[#1E2531] h-[1px]" />
            )}
          </>
        ))}
      </div>
    </div>
  )
}
