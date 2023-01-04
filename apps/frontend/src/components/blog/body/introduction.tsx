import { LightboxImage } from 'src/components/ui/LightboxImage'
import { BlogBody } from 'lib/@types/blog-types'
import React from 'react'
import { PortableText } from 'src/utils/sanity'
import { useWindowSize } from 'lib/hooks'

const serializers = {
  types: {
    image({ node }: any) {
      const windowWidth = useWindowSize()?.width ?? 0
      return <>{node && <LightboxImage image={node} width={windowWidth >= 1280 ? 900 : 250} />}</>
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
  const windowWidth = useWindowSize()?.width ?? 0

  return (
    <div className="blog-introduction">
      <LightboxImage image={image} width={windowWidth >= 1280 ? 900 : 250} variant="full" />

      <p className="text-[18px] font-light">
        <PortableText blocks={description} serializers={serializers} />
      </p>
    </div>
  )
}
1
