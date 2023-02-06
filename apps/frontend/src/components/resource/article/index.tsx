import {
  ForwardedRef,
  createRef,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useWindowSize } from "lib/hooks";
import { ShareWith } from "./body/share-with";
import { BlogBody } from "lib/@types/blog-types";
import { Overview } from "./body/overview";
import { ArticleSection } from "./body/article-section";
import { ScrollSpyWrapper } from "./scroll-spy-wrapper";
import crypto from "crypto";

interface ArticleProps {
  heading: string;
  ref?: ForwardedRef<HTMLElement>;
  body: any;
  intersecting: boolean;
}

const renderBlogArray = (body: BlogBody) => {
  switch (body._type) {
    case "overview":
      return <Overview {...body} />;
    case "section":
      return <ArticleSection {...body} />;
    case "share":
      return <ShareWith />;
  }
};

export const Article: React.FC<ArticleProps> = forwardRef(
  ({ body, heading, intersecting }, ref) => {
    const windowWidth = useWindowSize()?.width ?? 0;
    const [sectionRefs, setSectionRefs] = useState([]);
    const [navbarHeight, setNavbarHeight] = useState(0);

    const shareBlock: BlogBody = {
      _key: crypto.randomUUID(),
      _type: "share",
      heading: "Share With",
    };
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
      <article ref={ref} className="container h-full lg:pt-20 xl:pt-32">
        <ScrollSpyWrapper
          paddingY={navbarHeight}
          sections={sections}
          sectionRefs={sectionRefs}
          intersecting={intersecting}
        >
          <section
            data-cy="section-wrapper"
            className="relative mt-20 space-y-10 text-white lg:col-span-10 lg:mt-0"
          >
            {sections.map((section, index) => (
              <div
                id={`section-${index}`}
                key={section?._key ?? index}
                ref={sectionRefs[index]}
                className="scroll-mt-28"
              >
                {renderBlogArray({ ...section, title: heading })}
              </div>
            ))}
          </section>
        </ScrollSpyWrapper>
      </article>
    );
  }
);
