import { Description } from "components/ui/description";
import { Heading } from "components/ui/heading";
import { Title } from "components/ui/title";

export const Serializers = {
  marks: {
    link: (props: any) => {
      return (
        <a className="text-primary underline" href={props?.mark?.href}>
          {props.children}
        </a>
      );
    },
    pop: ({ children }: any) => (
      <span className="primary__gradient bg-clip-text text-transparent">
        {children}
      </span>
    ),
  },
  types: {
    block: (props: any) => {
      if (props.node.style === "pageHeader") {
        return (
          <h1 className="text-[40px] leading-[100%] md:text-5xl lg:text-5xl xl:text-[48px]">
            {props.children}
          </h1>
        );
      } else if (props.node.style === "sectionTitle") {
        return <Title>{props.children}</Title>;
      } else if (props.node.style === "sectionSubtitle") {
        return (
          <Heading spacing={false} variant="small">
            {props.children}
          </Heading>
        );
      }
      return <Description variant="small">{props.children}</Description>;
    },
  },
};
