import Button from 'src/components/ui/Button'
import { LightboxImage } from 'src/components/ui/LightboxImage'
import { CTAButton } from 'src/lib/@types/types'

export default {
  types: {
    image({ node }: any) {
      return (
        <>{node && <LightboxImage image={node} className="h-full object-cover" height={400} />}</>
      )
    },

    ctaList({ node: { ctaButtons } }: { node: { ctaButtons: CTAButton[] } }) {
      return (
        <div className="flex lg:flex-row flex-col lg:space-x-5 lg:space-y-0 space-y-3">
          {ctaButtons.map(({ href, title }) => (
            <div className="flex">
              <div>
                <Button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.open(href, '_blank')
                    }
                  }}
                >
                  {title}
                </Button>
              </div>
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
