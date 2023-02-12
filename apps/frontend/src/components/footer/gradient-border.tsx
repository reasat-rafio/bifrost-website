import { motion } from "framer-motion";

interface GradientBorderProps {}

const colors = ["#70FCEB", "#9BB8FF", "#B794FF"];
const gradientVariants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: { duration: 4, ease: "linear", repeat: Infinity },
  },
};

export const GradientBorder: React.FC<GradientBorderProps> = ({ children }) => {
  return (
    <motion.div
      className="primary__gradient relative mb-10 bg-black pt-[1px] sm:mx-5 xl:mx-auto "
      variants={gradientVariants}
      initial="initial"
      animate="animate"
      style={{
        background: `linear-gradient(90deg, ${colors.join(",")})`,
        backgroundSize: "400% 400%",
        width: "100vw",
      }}
    >
      <div className="flex flex-col justify-between bg-black pt-[2px]">
        {children}
      </div>
    </motion.div>
  );
};
