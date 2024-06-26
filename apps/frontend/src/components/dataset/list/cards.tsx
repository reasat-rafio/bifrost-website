import { IDatasetListPreview } from "lib/@types/dataset-types";
import { useRouter } from "next/router";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "utils/sanity";
import { motion } from "framer-motion";
import Link from "next/link";
import { CardAnimationVariants } from "./datasets";
import { OverflownTasks } from "./overflown-tasks";
interface IDatasetCards extends IDatasetListPreview {
  index: number;
}

export const DatasetCards: React.FC<IDatasetCards> = ({
  categories,
  heading,
  image,
  slug,
  subHeading,
  // taskTypes,
  tasks,
  index,
  _id,
}) => {
  const router = useRouter();

  return (
    <motion.div
      key={_id}
      custom={index}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={CardAnimationVariants}
      className="background__dark group col-span-12 h-full cursor-pointer rounded-primary md:col-span-6 xl:col-span-4"
      onClick={() => {
        router.push(`/datasets/${slug.current}`);
      }}
    >
      <div className="flex flex-col space-y-1 border-b border-[#1E2531] p-3 font-light ">
        <div className="mb-1 h-[215px] overflow-hidden rounded-[14px]">
          <SanityImg
            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
            image={image}
            builder={imageUrlBuilder}
            alt={`${heading}'s image`}
          />
        </div>

        <Link href={`/datasets/${slug.current}`}>
          <a>
            <h6 className="cursor-pointer truncate from-[#eeffe9]  via-[#acffeb] to-[#c9ff71] text-[22px] font-light text-white transition-none duration-300 hover:bg-gradient-to-l hover:bg-clip-text hover:text-transparent">
              {heading}
            </h6>
          </a>
        </Link>

        <span className="text-[14px]">{subHeading}</span>
      </div>
      <div className="flex flex-col space-y-2 px-3 py-3 text-[14px]">
        <div className="flex space-x-3">
          {categories?.map(({ name, _id }) => (
            <div key={_id}>{name}</div>
          ))}
        </div>

        <OverflownTasks tasks={tasks} />
        <div className="flex space-x-10 text-opacity-70">
          <span className="underline">716 Images</span>
          <span>YOLO Format</span>
        </div>
      </div>
    </motion.div>
  );
};
