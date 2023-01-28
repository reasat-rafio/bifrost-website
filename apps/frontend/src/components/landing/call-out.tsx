import { Button } from 'components/ui/button'
import { Description } from 'components/ui/description'
import { Section } from 'components/ui/section'
import { CTAButton } from 'lib/@types/global-types'
import React from 'react'
import { PortableText } from 'utils/sanity'

interface CallOutProps {
  type: string
  ctaButton: CTAButton
  description: string
  heading: any
}

export const CallOut: React.FC<CallOutProps> = ({ ctaButton, description, heading }) => {
  return (
    <Section borderBottom={false}>
      <div className="flex flex-col justify-center | spacing_primary lg:px-[4%] | font-light"></div>
      <div className="text-center text-[64px] font-light">
        <PortableText
          blocks={heading}
          serializers={{
            marks: {
              pop: ({ children }: any) => (
                <span className="text-transparent bg-clip-text primary__gradient">{children}</span>
              ),
              strong: ({ children }: any) => <span className="font-semibold">{children}</span>,
            },
          }}
        />
      </div>
      <Description textBig className="text-center max-w-3xl mx-auto">
        {description}
      </Description>
      <div className="text-center !mt-12">
        <Button type="href" variant="secondary" href={ctaButton.href}>
          {ctaButton.title}
        </Button>
      </div>
    </Section>
  )
}
