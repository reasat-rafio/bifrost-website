import clsx from 'clsx'
import { LightboxImage } from 'src/components/ui/LightboxImage'
import { BlogBody, IQuote } from 'lib/@types/blog-types'
import React from 'react'
import { PortableText } from 'utils/sanity'
import { useWindowSize } from 'lib/hooks'

const serializers = {
  types: {
    image({ node }: any) {
      const windowWidth = useWindowSize()?.width ?? 0
      return <>{node && <LightboxImage image={node} width={windowWidth >= 1280 ? 900 : 250} />}</>
    },

    quote({ node: { text, author, url } }: { node: IQuote }) {
      return (
        <div className="bifrost__gradient_pink xl:p-16 p-5 rounded-[15px] flex flex-col space-y-5 mb-6">
          <q
            onClick={() => {
              if (url && typeof window !== 'undefined') {
                window.open(url, '_blank')
              }
            }}
            className={clsx(
              'text-[#000610] xl:text-[40px] text-[25px] font-[275] transition-all duration-300',
              !url && 'cursor-pointer',
            )}
          >
            {text}
          </q>

          <span className="text-[#5D6588] xl:text-[20px] text-base font-light">{author}</span>
        </div>
      )
    },
  },
}

export const BlogSection: React.FC<BlogBody> = ({ description, heading, hideHeading }) => {
  return (
    <div className="prose-lg prose-cyan max-w-none">
      {!hideHeading && (
        <h4 className="text-[#000610] text-[32px] tracking-[0.02em] mb-6">{heading}</h4>
      )}
      <div className="">
        <PortableText blocks={description} serializers={serializers} />
      </div>
    </div>
  )
}
