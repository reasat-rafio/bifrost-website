import { LightboxImage } from 'src/components/ui/LightboxImage'
import { BlogBody } from 'src/lib/@types/blogTypes'
import React from 'react'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder, PortableText } from 'src/utils/sanity'

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
          return <p className="pb-6">{props.children}</p>
        default:
          return <p className="pb-6">{props.children}</p>
      }
    },
  },
}

export const Introduction: React.FC<BlogBody> = ({ description, image }) => {
  return (
    <div className="blog-introduction">
      <LightboxImage
        image={image}
        className="w-full h-full object-cover rounded-[15px]"
        height={500}
      />

      <p className="text-[18px] font-light">
        <PortableText blocks={description} serializers={serializers} />
      </p>
    </div>
  )
}
