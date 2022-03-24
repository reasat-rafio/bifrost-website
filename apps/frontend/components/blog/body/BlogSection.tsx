import clsx from 'clsx'
import { BlogBody, IQuote } from 'lib/@types/blogTypes'
import React from 'react'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder, PortableText } from 'utils/sanity'

const serializers = {
  types: {
    image({ node }: any) {
      return (
        <>
          {node && (
            <div className="">
              <SanityImg
                className="rounded-x"
                image={node}
                builder={imageUrlBuilder}
                alt="image"
                height={470}
              />
            </div>
          )}
        </>
      )
    },
    block(props: any) {
      switch (props.node.style) {
        case 'normal':
          return <p className="pb-3">{props.children}</p>
        default:
          return <p className="pb-3">{props.children}</p>
      }
    },
    quote({ node: { text, author, url } }: { node: IQuote }) {
      return (
        <div className="bifrost__gradient_pink p-16 rounded-[15px] flex flex-col space-y-5 mb-6">
          <q
            onClick={() => {
              if (url && typeof window !== 'undefined') {
                window.open(url, '_blank')
              }
            }}
            className={clsx(
              'text-[#000610] text-[40px] font-[275] transition-all duration-300',
              !url && 'cursor-pointer',
            )}
          >
            {text}
          </q>

          <span className="text-[#5D6588] text-[20px] font-light">{author}</span>
        </div>
      )
    },
  },
}

export const BlogSection: React.FC<BlogBody> = ({ description, heading, hideHeading }) => {
  return (
    <div>
      {!hideHeading && (
        <h4 className="text-[#000610] text-[32px] tracking-[0.02em] mb-6">{heading}</h4>
      )}
      <p className="text-[18px] font-light">
        <PortableText blocks={description} serializers={serializers} />
      </p>
    </div>
  )
}
