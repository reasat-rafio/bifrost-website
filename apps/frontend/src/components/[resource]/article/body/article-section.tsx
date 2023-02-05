import clsx from "clsx";
import { LightboxImage } from "src/components/ui/LightboxImage";
import { BlogBody } from "lib/@types/blog-types";
import React from "react";
import { PortableText } from "utils/sanity";
import { useWindowSize } from "lib/hooks";
import { Quote, QuoteProps } from "./quote";
import { Title } from "components/ui/title";
import { Description } from "components/ui/description";

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

    quote({ node: { text, author, url } }: { node: QuoteProps }) {
      return <Quote text={text} author={author} url={url} />;
    },
  },
};

export const ArticleSection: React.FC<BlogBody> = ({
  description,
  heading,
  subHeading,
}) => {
  return (
    <div className="prose-lg prose-cyan max-w-none">
      <Title className="font-light">{heading}</Title>
      {!!subHeading && (
        <Description type="h5" textBig className="font-light text-white">
          {subHeading}
        </Description>
      )}
      <div className="">
        <PortableText blocks={description} serializers={serializers} />
      </div>
    </div>
  );
};
