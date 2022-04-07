import Button from 'components/ui/Button'
import { LightboxImage } from 'components/ui/LightboxImage'
import { CTAButton } from 'lib/@types/types'

export default {
  types: {
    image({ node }: any) {
      return (
        <>{node && <LightboxImage image={node} className="h-full object-cover" height={400} />}</>
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
    ctaList({ node: { ctaButtons } }: { node: { ctaButtons: CTAButton[] } }) {
      console.log('node', ctaButtons)

      return (
        <div className="flex space-x-5">
          {ctaButtons.map(({ href, title }) => (
            <div>
              <Button>{title}</Button>
            </div>
          ))}
        </div>
      )
    },
  },
}
