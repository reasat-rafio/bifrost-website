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
  },
}

export const Introduction: React.FC<BlogBody> = ({ description, image }) => {
  const windowWidth = useWindowSize()?.width ?? 0

  return (
    <div className="blog-introduction prose-lg prose-cyan max-w-none">
      <LightboxImage image={image} width={windowWidth >= 1280 ? 900 : 250} variant="full" />

      <div className="">
        <PortableText blocks={description} serializers={serializers} />
      </div>
    </div>
  )
}
1
