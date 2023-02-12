import { formatDate } from "src/lib/helpers";
import React from "react";

interface HeadingProps {
  heading: string;
  datetime: string;
}

export const Heading: React.FC<HeadingProps> = ({ heading, datetime }) => {
  return (
    <div className="grid grid-cols-12 lg:gap-10">
      <div className="lg:col-span-3" />
      <header className="col-span-12 max-w-4xl lg:col-span-9 2xl:max-w-5xl">
        <h1 className="mb-3 text-3xl font-primary !leading-none text-midnight-blue lg:text-4xl xl:text-[52px]">
          {heading}
        </h1>
        <span className="text-base text-[#5D6588]">
          {formatDate(datetime?.split("T")[0])}
        </span>
      </header>
    </div>
  );
};
