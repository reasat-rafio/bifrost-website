import { Button } from "components/ui/button";
import { Description } from "components/ui/description";
import { Section } from "components/ui/section";
import { CTAButton } from "lib/@types/global-types";
import React from "react";
import { PortableText } from "utils/sanity";

interface ContactProps {
  type: string;
  ctaButton: CTAButton;
  description?: string;
  heading: any;
}

const Contact: React.FC<ContactProps> = ({
  ctaButton,
  description,
  heading,
}) => {
  return (
    <Section borderBottom={false}>
      <div className="flex flex-col justify-center space-y-4 font-light sm:space-y-7 lg:space-y-12 lg:px-[4%]">
        <div className="text-center text-[64px] font-light leading-none">
          <PortableText
            blocks={heading}
            serializers={{
              marks: {
                pop: ({ children }: any) => (
                  <span
                    style={{
                      WebkitBoxDecorationBreak: "clone",
                    }}
                    className="primary__gradient break-words bg-clip-text text-transparent"
                  >
                    {children}
                  </span>
                ),
                strong: ({ children }: any) => (
                  <span className="primary__gradient bg-clip-text font-semibold text-transparent">
                    {children}
                  </span>
                ),
              },
            }}
          />
        </div>
        {!!description && (
          <Description
            variant="big"
            className="mx-auto max-w-3xl text-center font-extralight"
          >
            {description}
          </Description>
        )}
        <div className="flex items-center justify-center">
          <Button type="href" variant="secondary" href={ctaButton.href}>
            {ctaButton.title}
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
