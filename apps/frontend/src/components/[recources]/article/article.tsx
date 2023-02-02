import {
  ForwardedRef,
  RefObject,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { PortableText } from "utils/sanity";
import { Serializers } from "./serializers";
import { useIntersection } from "lib/hooks";
import { useScroll } from "framer-motion";
import { ScrollDetective } from "components/common/scroll-detective";
import { ScrollSpyBig, SectionHeaderProps } from "./scroll-spy/scroll-spy-big";
import { ShareWith } from "./share-with";
import { ScrollSpySmall } from "./scroll-spy/scroll-spy-small";

interface ArticleProps {
  ref?: ForwardedRef<HTMLElement>;
  body: any;
}

export const Article: React.FC<ArticleProps> = forwardRef(({ body }, ref) => {
  const [navHeight, setNavbarHeight] = useState(0);
  const [sectionHeaders, setSectionHeaders] = useState<SectionHeaderProps[]>(
    []
  );

  const articleIntersecting = useIntersection(
    ref as RefObject<HTMLElement>
  )?.isIntersecting;

  const { scrollYProgress } = useScroll({
    target: ref as RefObject<HTMLElement>,
  });

  useLayoutEffect(() => {
    const height = document.querySelector("#navbar").clientHeight;
    setNavbarHeight(height);
  }, []);

  // ? From the portable text getting the headers which are marked as sectionTitle in sanity
  useEffect(() => {
    console.log(body);
    const sectionTitles = body
      .filter(({ style }) => style === "sectionTitle")
      .map((block: any) => ({
        _key: block?._key,
        text: block?.children.map(({ text }) => text)[0].toLowerCase(),
      }));
    setSectionHeaders([
      { _key: crypto.randomUUID(), text: "Overview" },
      ...sectionTitles,
      { _key: crypto.randomUUID(), text: "Contact Us" },
    ]);
  }, []);

  return (
    <>
      <ScrollDetective
        intersecting={articleIntersecting}
        scrollYProgress={scrollYProgress}
      />
      <ScrollSpySmall
        className="block lg:hidden"
        intersecting={articleIntersecting}
        sectionHeaders={sectionHeaders}
        navHeight={navHeight}
      />
      <section
        style={{ paddingTop: navHeight }}
        className="relative grid grid-cols-13 pt-10"
      >
        <article
          ref={ref as React.LegacyRef<HTMLDivElement>}
          className="prose-lg col-span-full h-full max-w-none px-6 lg:col-span-11 lg:pr-5"
        >
          <PortableText blocks={body} serializers={Serializers} />
          <ShareWith />
        </article>

        <ScrollSpyBig
          className="col-span-2 hidden lg:block"
          sectionHeaders={sectionHeaders}
          navHeight={navHeight}
        />
      </section>
    </>
  );
});
