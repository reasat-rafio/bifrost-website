import { VFadeInOut } from "animations/fade-in-out";
import { motion, AnimatePresence } from "framer-motion";
import React, { ReactNode } from "react";

interface DescriptionProps {
  className?: string;
  children: ReactNode;
  textBig?: boolean;
  type?: "div" | "p" | "h5";
  animate?: {
    show?: boolean;
    delay?: number;
  };
}

export const Description: React.FC<DescriptionProps> = ({
  children,
  className,
  textBig = false,
  animate,
  type = "p",
}) => {
  const props = {
    className: `${className} ${
      textBig
        ? "lg:text-[36px] sm:text-3xl text-2xl"
        : "lg:text-[24px] sm:text-xl text-lg"
    }`,
  };

  const animationProps = {
    initial: "from",
    animate: "to",
    exitL: "exit",
    variants: VFadeInOut({ delay: animate?.delay }),
  };

  return (
    <>
      {type === "p" ? (
        <>
          {!!animate ? (
            <AnimatePresence>
              {animate.show && (
                <motion.p {...animationProps} {...props}>
                  {children as any}
                </motion.p>
              )}
            </AnimatePresence>
          ) : (
            <p {...props}>{children}</p>
          )}
        </>
      ) : type === "h5" ? (
        <>
          {!!animate ? (
            <AnimatePresence>
              {animate.show && (
                <motion.h5 {...animationProps} {...props}>
                  {children as any}
                </motion.h5>
              )}
            </AnimatePresence>
          ) : (
            <div {...props}>{children}</div>
          )}
        </>
      ) : (
        <>
          {!!animate ? (
            <AnimatePresence>
              {animate.show && (
                <motion.div {...animationProps} {...props}>
                  {children as any}
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <div {...props}>{children}</div>
          )}
        </>
      )}
    </>
  );
};
