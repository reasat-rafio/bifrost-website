import { VFadeInOut } from "animations/fade-in-out";
import { AnimatePresence, motion } from "framer-motion";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
  color?: "green" | "pink";
  el?: "h2" | "h3" | "h4";
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
  el = "h2",
}) => {
  const props = {
    className: `${className} ${color === "green" && "text-teal"} ${
      color === "pink" && "text-mauve"
    } uppercase lg:text-p-2 sm:text-xl text-lg leading-[120%] tracking-[2px]`,
  };
  return (
    <>
      {!!animate ? (
        <>
          {el === "h2" && (
            <motion.h2
              initial="from"
              animate={animate?.show ? "to" : "from"}
              variants={VFadeInOut({ delay: animate.delay })}
              {...props}
            >
              {children as any}
            </motion.h2>
          )}
          {el === "h3" && (
            <motion.h3
              initial="from"
              animate={animate?.show ? "to" : "from"}
              variants={VFadeInOut({ delay: animate.delay })}
              {...props}
            >
              {children as any}
            </motion.h3>
          )}
        </>
      ) : (
        <>
          {el === "h2" && <h2 {...props}>{children}</h2>}
          {el === "h3" && <h3 {...props}>{children}</h3>}
        </>
      )}
    </>
  );
};
