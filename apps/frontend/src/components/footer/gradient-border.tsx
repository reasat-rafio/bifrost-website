import { motion } from "framer-motion";
import { useIntersection } from "lib/hooks";
import { useRef } from "react";

interface GradientBorderProps {}

const colors = ["#70FCEB", "#9BB8FF", "#B794FF"];
const gradientVariants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: { duration: 4, ease: "linear", repeat: Infinity },
  },
};

export const GradientBorder: React.FC<GradientBorderProps> = ({ children }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const intersecting = useIntersection(sectionRef)?.isIntersecting ?? false;

  const styles = intersecting
    ? {
        background: `linear-gradient(90deg, ${colors.join(",")})`,
        backgroundSize: "400% 400%",
        width: "100vw",
      }
    : {};

  return (
    <motion.div
      ref={sectionRef}
      className="primary__gradient relative bg-black pt-[1px] xl:mx-auto "
      variants={gradientVariants}
      initial="initial"
      animate={intersecting ? "animate" : "initial"}
      style={styles}
    >
      <div className="flex flex-col justify-between bg-black pt-[2px]">
        {children}
      </div>
    </motion.div>
  );
};
