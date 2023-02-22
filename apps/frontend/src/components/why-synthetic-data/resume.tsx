import { CTAButton } from "lib/@types/global-types";
import { GradientBorder } from "components/ui/gradient-border";
import { Button } from "components/ui/button";
import { PortableText } from "utils/sanity";
import { motion } from "framer-motion";

interface ResumeProps {
  headline: any;
  ctaButton: CTAButton;
}

export const Resume: React.FC<ResumeProps> = ({ headline, ctaButton }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "tween", duration: 0.7, ease: "easeInOut" }}
      className="container relative z-10 mb-16 text-center lg:mb-20 xl:mb-36"
    >
      <GradientBorder>
        <div className="flex flex-col space-y-4 py-10 px-5 md:space-y-8 md:py-20">
          <h4 className="mx-auto max-w-2xl text-center text-head-3-mobile font-primary leading-none md:text-head-md xl:text-head-3">
            <PortableText
              blocks={headline}
              serializers={{
                marks: {
                  pop: ({ children }: any) => (
                    <span
                      style={{
                        WebkitBoxDecorationBreak: "clone",
                      }}
                      className="primary__gradient bg-clip-text text-transparent"
                    >
                      {children}
                    </span>
                  ),
                },
              }}
            />
          </h4>
          {!!ctaButton && (
            <div className="z-10">
              <Button
                variant="primary"
                type="href"
                href={ctaButton?.href ?? ""}
              >
                {ctaButton.title}
              </Button>
            </div>
          )}
        </div>
      </GradientBorder>
    </motion.section>
  );
};
