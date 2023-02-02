import { LightboxImage } from 'components/ui/LightboxImage'
import { Heading } from 'components/ui/heading'
import { Title } from 'components/ui/title'
import { useWindowSize } from 'lib/hooks'
import { Quote, QuoteProps } from './quote'

export const Serializers = {
  types: {
    block: (props: any) => {
      if (props.node.style === 'pageHeader') {
        return <h1></h1>
      } else if (props.node.style === 'sectionTitle') {
        return <Title className="font-light">{props.children}</Title>
      } else if (props.node.style === 'sectionSubtitle') {
        return <Heading className="text-white font-light">{props.children}</Heading>
      }
      return <p>{props.children}</p>
    },
    image({ node }: any) {
      const windowWidth = useWindowSize()?.width ?? 0
      return <>{node && <LightboxImage image={node} width={windowWidth >= 1280 ? 900 : 250} />}</>
    },

    quote({ node: { text, author, url } }: { node: QuoteProps }) {
      return <Quote text={text} author={author} url={url} />
    },
  },
}
