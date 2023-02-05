import { LightboxImage } from "components/ui/LightboxImage";
import { Title } from "components/ui/title";
import { useWindowSize } from "lib/hooks";
import { Quote, QuoteProps } from "./quote";
import { Description } from "components/ui/description";

export const Serializers = {
  types: {
    block: (props: any) => {
      if (props.node.style === "pageHeader") {
        return (
          <h1 className="primary__gradient bg-clip-text py-2 font-primary text-transparent sm:text-head-5 md:text-4xl lg:text-[48px]">
            {props.children}
          </h1>
        );
      } else if (props.node.style === "sectionTitle") {
        return <Title className="font-light">{props.children}</Title>;
      } else if (props.node.style === "sectionSubtitle") {
        return (
          <Description type="h5" textBig className="font-light text-white">
            {props.children}
          </Description>
        );
      }
      return <p>{props.children}</p>;
    },
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
