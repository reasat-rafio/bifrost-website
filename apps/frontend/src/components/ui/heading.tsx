import { VFadeInOut } from "animations/fade-in-out";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode } from "react";

interface HeadingProps {
  className?: string;
  children: ReactNode;
  el?: "h3" | "h4";

  animate?: {
    show?: boolean;
    delay?: number;
  };
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  className,
  animate,
  el = "h3",
}) => {
  const props = {
    className: `${className} xl:text-[48px] lg:text-5xl md:text-5xl text-[40px]`,
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
          {el === "h3" && <h3 {...props}>{children}</h3>}
          {el === "h4" && <h4 {...props}>{children}</h4>}
        </>
      )}
    </>
  );
};
