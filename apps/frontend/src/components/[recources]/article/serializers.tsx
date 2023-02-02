import clsx from 'clsx'
import { LightboxImage } from 'components/ui/LightboxImage'
import { Heading } from 'components/ui/heading'
import { Title } from 'components/ui/title'
import { IQuote } from 'lib/@types/blog-types'
import { useWindowSize } from 'lib/hooks'

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
