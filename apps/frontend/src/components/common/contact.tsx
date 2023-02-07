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

export const Contact: React.FC<ContactProps> = ({
  ctaButton,
  description,
  heading,
}) => {
  return (
    <Section borderBottom={false}>
      <div className="| spacing_primary | flex flex-col justify-center font-light lg:px-[4%]"></div>
      <div className="text-center text-[64px] font-light">
        <PortableText
          blocks={heading}
          serializers={{
            marks: {
              pop: ({ children }: any) => (
                <span className="primary__gradient bg-clip-text text-transparent">
                  {children}
                </span>
              ),
              strong: ({ children }: any) => (
                <span className="font-semibold">{children}</span>
              ),
            },
          }}
        />
      </div>
      {!!description && (
        <Description variant="big" className="mx-auto max-w-3xl text-center">
          {description}
        </Description>
      )}

      <div className="!mt-12 text-center">
        <Button type="href" variant="secondary" href={ctaButton.href}>
          {ctaButton.title}
        </Button>
      </div>
    </Section>
  );
};
