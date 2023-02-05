import {
  ForwardedRef,
  createRef,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { PortableText } from "utils/sanity";
import { Serializers } from "./serializers";
import { useIntersection, useWindowSize } from "lib/hooks";
import { useScroll } from "framer-motion";
import { ScrollDetective } from "components/common/scroll-detective";
import { ScrollSpyBig, SectionHeaderProps } from "./scroll-spy/scroll-spy-big";
import { ShareWith } from "./share-with";
import { ScrollSpySmall } from "./scroll-spy/scroll-spy-small";
import { BlogBody } from "lib/@types/blog-types";
import { Overview } from "./body/overview";
import { BlogSection } from "./body/blog-section";
import { ScrollSpyWrapper } from "./scroll-spy-wrapper";

interface ArticleProps {
  heading: string;
  ref?: ForwardedRef<HTMLElement>;
  body: any;
}

const renderBlogArray = (body: BlogBody) => {
  switch (body._type) {
    case "overview":
      return <Overview {...body} />;
    case "section":
      return <BlogSection {...body} />;
    case "share":
      return <ShareWith />;
  }
};

const shareBlock: BlogBody = {
  _key: crypto.randomUUID(),
  _type: "share",
  heading: "Share With",
};
export const Article: React.FC<ArticleProps> = forwardRef(
  ({ body, heading }, ref) => {
    const windowWidth = useWindowSize()?.width ?? 0;
    const [sectionRefs, setSectionRefs] = useState([]);
    const [navbarHeight, setNavbarHeight] = useState(0);
    const sections = [...body, shareBlock];
    const totalSectionsLength = sections.length;

    useLayoutEffect(() => {
      const height = document.querySelector("#navbar")?.clientHeight ?? 0;
      setNavbarHeight(height);
    }, [windowWidth]);

    useEffect(() => {
      setSectionRefs((sectionRefs) =>
        [...Array(totalSectionsLength)].map(
          (_, i) => sectionRefs[i] || createRef()
        )
      );
    }, [totalSectionsLength]);

    return (
      <article ref={ref} className="container h-full">
        <ScrollSpyWrapper
          paddingY={navbarHeight}
          sections={sections}
          sectionRefs={sectionRefs}
        >
          <div
            data-cy="section-wrapper"
            className="relative mt-20 max-w-4xl space-y-10 rounded-lg text-white lg:col-span-9 lg:mt-0 2xl:max-w-5xl"
          >
            {sections.map((section, index) => (
              <div
                id={`section-${index}`}
                key={section?._key ?? index}
                ref={sectionRefs[index]}
              >
                {renderBlogArray({ ...section, title: heading })}
              </div>
            ))}
          </div>
        </ScrollSpyWrapper>
      </article>
    );
  }
);
