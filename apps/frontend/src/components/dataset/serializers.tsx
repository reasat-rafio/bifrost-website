import { CTAButton } from 'lib/@types/global-types'
import { Button } from 'components/ui/button'
import { imageUrlBuilder } from 'utils/sanity'

export default {
  types: {
    image({ node }: any) {
      return (
        <figure>
          <img
            className="h-auto w-auto object-cover rounded max-h-[600px] overflow-hidden"
            src={imageUrlBuilder.image(node).maxWidth(700).maxHeight(600).quality(50) as any}
            alt={node.alt ?? ''}
          />
        </figure>
      )
    },

    ctaList({ node: { ctaButtons } }: { node: { ctaButtons: CTAButton[] } }) {
      return (
        <div className="flex lg:flex-row flex-col lg:space-x-5 lg:space-y-0 space-y-3 prose-a:text-white prose-a:no-underline">
          {ctaButtons.map(({ href, title }) => (
            <div className="flex">
              <Button type="href" href={href ?? '/'}>
                {title}
              </Button>
            </div>
          ))}
        </div>
      )
    },
  },
  marks: {
    lowOpacity: ({ children }: any) => <span className="text-[#585d66]">{children}</span>,
    link: (props: any) => (
      <a target="_brank" href={props.mark.url}>
        {props.children}
      </a>
    ),
  },
}
