import { VFadeInOut } from "animations/fade-in-out";
import { AnimatePresence, motion } from "framer-motion";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
  color?: "green" | "pink";
  animate?: {
    show?: boolean;
    delay?: number;
  };
}

export const Title: React.FC<TitleProps> = ({
  children,
  className,
  color = "green",
  animate,
}) => {
  const props = {
    className: `${className} ${color === "green" && "text-teal"} ${
      color === "pink" && "text-mauve"
    } uppercase lg:text-p-2 sm:text-xl text-lg`,
  };
  return (
    <>
      {!!animate ? (
        <AnimatePresence>
          {animate.show && (
            <motion.h2
              initial="from"
              animate="to"
              exit="exit"
              variants={VFadeInOut({ delay: animate.delay })}
              {...props}
            >
              {children as any}
            </motion.h2>
          )}
        </AnimatePresence>
      ) : (
        <h2 {...props}>{children}</h2>
      )}
    </>
  );
};
