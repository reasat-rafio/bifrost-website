import { PortableText } from "utils/sanity";
import { GradientBorder } from "../ui/gradient-border";
import { CTAButton } from "lib/@types/global-types";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import clsx from "clsx";

interface NewsletterProps {
  title: any;
  subtitle?: string;
  ctaButton: CTAButton;
  padding?: "top" | "bottom" | "top-and-bottom";
}

export const Newsletter: React.FC<NewsletterProps> = ({
  title,
  ctaButton,
  subtitle,
  padding = "bottom",
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-200px" }}
      transition={{ type: "tween", duration: 0.7, ease: "easeInOut" }}
      className={clsx(
        "container relative z-10 text-center",
        padding === "top" && "pt-16 lg:pt-20 xl:pt-36",
        padding === "bottom" && "pb-16 lg:pb-20 xl:pb-36",
        padding === "top-and-bottom" && "py-16 lg:py-20 xl:py-36"
      )}
    >
      <GradientBorder>
        <div className="| flex flex-col space-y-4 py-10 px-5 md:space-y-8 md:py-20">
          <h4 className="| | | mx-auto max-w-2xl text-center text-head-3-mobile font-primary leading-none md:text-head-md xl:text-head-3">
            <PortableText
              blocks={title}
              serializers={{
                marks: {
                  pop: ({ children }: any) => (
                    <span className="primary__gradient bg-clip-text text-transparent">
                      {children}
                    </span>
                  ),
                },
              }}
            />
          </h4>
          {!!subtitle && (
            <p className="| | mx-auto max-w-lg text-sm font-light leading-snug md:text-body-2">
              {subtitle}
            </p>
          )}

          <div className="relative mx-auto flex w-full max-w-lg">
            <input
              autoComplete="off"
              className="| | text-gray-700 | | focus:shadow-outline | input__dark w-full appearance-none rounded-primary py-4 px-5 text-body-3 leading-tight shadow focus:outline-none md:py-6 "
              id="username"
              type="email"
              placeholder="Enter your email address"
            />

            <div className="| absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 md:block">
              <Button
                variant="primary"
                type="href"
                href={ctaButton?.href ?? ""}
              >
                {ctaButton.title}
              </Button>
            </div>
          </div>
          <div className="block md:hidden">
            <Button variant="primary" type="href" href={ctaButton?.href ?? ""}>
              {ctaButton.title}
            </Button>
          </div>
        </div>
      </GradientBorder>
    </motion.section>
  );
};
