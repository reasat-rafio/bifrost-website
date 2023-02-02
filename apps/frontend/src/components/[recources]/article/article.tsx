import { forwardRef } from 'react'
import { PortableText } from 'utils/sanity'
import { Serializers } from './serializers'

interface ArticleProps {
  ref?: React.ForwardedRef<HTMLElement>
  body: any
}

export const Article: React.FC<ArticleProps> = forwardRef(({ body }, ref) => {
  return (
    <article
      ref={ref as React.LegacyRef<HTMLDivElement>}
      className="px-6 pt-24 h-full prose max-w-none"
    >
      <PortableText blocks={body} serializers={Serializers} />
    </article>
  )
})
