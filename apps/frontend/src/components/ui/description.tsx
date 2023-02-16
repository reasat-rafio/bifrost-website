import { VFadeInOut } from "animations/fade-in-out";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface DescriptionProps {
  className?: string;
  children: ReactNode;
  variant?: "normal" | "big" | "small";
  type?: "div" | "p" | "h5";
  animate?: {
    show?: boolean;
    delay?: number;
  };
}

export const Description: React.FC<DescriptionProps> = ({
  children,
  className,
  variant = "normal",
  animate,
  type = "p",
}) => {
  const props = {
    className: `${className} ${
      variant === "big"
        ? "lg:text-p-1 sm:text-3xl text-2xl md:!leading-[48px] md:!tracking-[2px] tracking-[0.02em] leading-[30px]"
        : variant === "small"
        ? "lg:text-p-3 sm:text-xl text-p-3-mobile !tracking-[0.02em] md:!leading-[30px] leading-[25px]"
        : "lg:text-p-2 sm:text-2xl text-xl !tracking-[0.02em] md:!leading-[30px] leading-[25px]"
    }`,
  };

  const animationProps = {
    initial: "from",
    animate: animate?.show ? "to" : "from",
    variants: VFadeInOut({ delay: animate?.delay }),
  };

  return (
    <>
      {type === "p" ? (
        <>
          {!!animate ? (
            <motion.p {...animationProps} {...props}>
              {children as any}
            </motion.p>
          ) : (
            <p {...props}>{children}</p>
          )}
        </>
      ) : type === "h5" ? (
        <>
          {!!animate ? (
            <motion.h5 {...animationProps} {...props}>
              {children as any}
            </motion.h5>
          ) : (
            <div {...props}>{children}</div>
          )}
        </>
      ) : (
        <>
          {!!animate ? (
            <motion.div {...animationProps} {...props}>
              {children as any}
            </motion.div>
          ) : (
            <div {...props}>{children}</div>
          )}
        </>
      )}
    </>
  );
};
