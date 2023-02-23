import { VFadeInOut } from "animations/fade-in-out";
import { motion } from "framer-motion";
import { useWindowSize } from "lib/hooks";
import React, { ReactNode } from "react";

interface HeadingProps {
  className?: string;
  children: ReactNode;
  el?: "h2" | "h3" | "h4";
  variant?: "normal" | "big" | "small";
  spacing?: boolean;
  animate?: {
    show?: boolean;
    delay?: number;
  };
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  className = "",
  animate,
  variant = "normal",
  spacing = true,
  el = "h3",
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const props = {
    className: `${className} drop-shadow-md ${
      variant === "normal" &&
      `xl:text-[48px] lg:text-5xl md:text-5xl text-[40px] ${
        spacing && "md:!leading-[120%] md:!tracking-[0.02em] leading-[100%]"
      }`
    } ${
      variant === "small" &&
      `text-2xl sm:text-3xl lg:text-[38px] ${
        spacing &&
        "md:!leading-[48px] md:!tracking-[2px] tracking-[0.02em] leading-[30px]"
      }`
    } `,
  };

  const animationProps = {
    initial: "form",
    animate: animate?.show ? "to" : "from",
    variants: VFadeInOut({ delay: animate?.delay }),
  };

  return (
    <>
      {!!animate && windowWidth >= 768 ? (
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
