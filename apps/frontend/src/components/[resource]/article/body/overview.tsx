import { LightboxImage } from "src/components/ui/LightboxImage";
import { BlogBody } from "lib/@types/blog-types";
import React from "react";
import { PortableText } from "utils/sanity";
import { useWindowSize } from "lib/hooks";

const serializers = {
  types: {
    image({ node }: any) {
      const windowWidth = useWindowSize()?.width ?? 0;
      return (
        <>
          {node && (
            <LightboxImage
              image={node}
              width={windowWidth >= 1280 ? 900 : 250}
            />
          )}
        </>
      );
    },
  },
};

export const Overview: React.FC<BlogBody> = ({ description, image, title }) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <div className="prose-lg max-w-none">
      <h1 className="primary__gradient bg-clip-text py-2 font-primary text-transparent sm:text-head-5 md:text-4xl lg:text-[48px]">
        {title}
      </h1>
      <LightboxImage
        image={image}
        width={windowWidth >= 1280 ? 900 : 250}
        variant="full"
      />

      <div className="">
        <PortableText blocks={description} serializers={serializers} />
      </div>
    </div>
  );
};
1;
