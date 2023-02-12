import { PathVariants } from "./play-icon";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "utils/sanity";
import { AssetElement } from "lib/@types/landing-types";
import { motion } from "framer-motion";

interface VideoThumbnailProps extends AssetElement {
  windowWidth: number;
}

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  thumbnail,
  windowWidth,
  _key,
}) => {
  const onClickAction = () => {};

  return (
    <motion.div
      layout
      layoutId={_key}
      className="h-full w-full overflow-hidden object-cover object-center"
    >
      <div className="relative h-full w-full">
        <PlayIcon onClick={onClickAction} />
        <SanityImg
          className="h-full w-full rounded-primary object-cover"
          height={windowWidth >= 1024 ? 300 : windowWidth >= 640 ? 250 : 220}
          builder={imageUrlBuilder}
          image={thumbnail}
          alt={thumbnail?.alt ?? ""}
        />
      </div>
    </motion.div>
  );
};

const PlayIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.svg
      onClick={onClick}
      className="absolute top-1/2 left-1/2 z-30 h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-105 lg:h-[100px] lg:w-[100px]"
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ type: "tween", ease: "easeInOut" }}
      width="111"
      height="111"
      viewBox="0 0 111 111"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        initial="hidden"
        animate={"visible"}
        variants={PathVariants}
        d="M75.7523 49.4946C77.612 50.783 77.612 53.5323 75.7523 54.8207L48.2338 73.8861C46.0852 75.3747 43.149 73.837 43.149 71.2231L43.149 33.0923C43.149 30.4784 46.0852 28.9406 48.2338 30.4292L75.7523 49.4946Z"
        fill="white"
      />

      <motion.rect
        variants={PathVariants}
        initial="hidden"
        animate="visible"
        x="1.2149"
        y="1.2149"
        width="108.43"
        height="108.43"
        rx="54.2149"
        stroke="white"
        stroke-width="2.42981"
      />
    </motion.svg>
  );
};
