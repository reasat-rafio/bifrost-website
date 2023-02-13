import { VFadeInOut } from "animations/fade-in-out";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode } from "react";

interface HeadingProps {
  className?: string;
  children: ReactNode;
  el?: "h2" | "h3" | "h4";
  variant?: "normal" | "big" | "small";

  animate?: {
    show?: boolean;
    delay?: number;
  };
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  className,
  animate,
  variant = "normal",
  el = "h3",
}) => {
  const props = {
    className: `${className} drop-shadow-md ${
      variant === "normal" &&
      "xl:text-[48px] lg:text-5xl md:text-5xl text-[40px] md:!leading-[120%] md:!tracking-[0.02em] leading-[100%]"
    } ${
      variant === "small" &&
      "text-2xl md:!leading-[48px] md:!tracking-[2px] sm:text-3xl lg:text-[38px] tracking-[0.02em] leading-[30px]"
    } `,
  };

  const animationProps = {
    initial: "form",
    animate: "to",
    exit: "exit",
    variants: VFadeInOut({ delay: animate?.delay }),
  };

  return (
    <>
      {!!animate ? (
        <AnimatePresence>
          {animate.show && (
            <>
              {el === "h2" && (
                <motion.h2 {...animationProps} {...props}>
                  {children as any}
                </motion.h2>
              )}
              {el === "h3" && (
                <motion.h3 {...animationProps} {...props}>
                  {children as any}
                </motion.h3>
              )}
              {el === "h4" && (
                <motion.h4 {...animationProps} {...props}>
                  {children as any}
                </motion.h4>
              )}
            </>
          )}
        </AnimatePresence>
      ) : (
        <>
          {el === "h2" && <h2 {...props}>{children}</h2>}
          {el === "h3" && <h3 {...props}>{children}</h3>}
          {el === "h4" && <h4 {...props}>{children}</h4>}
        </>
      )}
    </>
  );
};
