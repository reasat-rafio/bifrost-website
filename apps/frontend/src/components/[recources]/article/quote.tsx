import clsx from "clsx";
import { GradientBorder } from "components/ui/gradient-border";

export interface QuoteProps {
  text: string;
  author: string;
  url?: string;
}

export const Quote: React.FC<QuoteProps> = ({ text, author, url }) => {
  const onClickAction = () => {
    if (url && typeof window !== "undefined") window.open(url, "_blank");
  };

  return (
    <GradientBorder>
      <div
        onClick={onClickAction}
        className={clsx(
          !!url && "cursor-pointer",
          "flex flex-col space-y-5 p-10 font-light md:space-y-10"
        )}
      >
        <q className="text-head-6 md:text-head-5">{text}</q>
        <div className="text-base text-teal xl:text-[20px]">
          <span> - </span>
          <span className="">{author}</span>
        </div>
      </div>
    </GradientBorder>
  );
};
