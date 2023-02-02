import {
  ForwardedRef,
  RefObject,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { PortableText } from "utils/sanity";
import { Serializers } from "./serializers";
import { useIntersection } from "lib/hooks";
import { useScroll } from "framer-motion";
import { ScrollDetective } from "components/common/scroll-detective";
import { ScrollSpy, SectionHeaderProps } from "./scroll-spy";

interface ArticleProps {
  ref?: ForwardedRef<HTMLElement>;
  body: any;
}

export const Article: React.FC<ArticleProps> = forwardRef(({ body }, ref) => {
  const [sectionHeaders, setSectionHeaders] = useState<SectionHeaderProps[]>(
    []
  );

  const articleIntersecting = useIntersection(
    ref as RefObject<HTMLElement>
  )?.isIntersecting;

  const { scrollYProgress } = useScroll({
    target: ref as RefObject<HTMLElement>,
  });

  // ? From the portable text getting the headers which are marked as sectionTitle in sanity
  useEffect(() => {
    console.log(body);
    const sectionTitles = body
      .filter(({ style }) => style === "sectionTitle")
      .map((block: any) => ({
        _key: block?._key,
        text: block?.children.map(({ text }) => text)[0],
      }));
    setSectionHeaders(sectionTitles);
  }, []);

  return (
    <>
      <ScrollDetective
        intersecting={articleIntersecting}
        scrollYProgress={scrollYProgress}
      />
      <div>
        <article
          ref={ref as React.LegacyRef<HTMLDivElement>}
          className="prose-lg h-full max-w-none px-6 pt-24"
        >
          <PortableText blocks={body} serializers={Serializers} />
        </article>
        <ScrollSpy sectionHeaders={sectionHeaders} />
      </div>
    </>
  );
});
