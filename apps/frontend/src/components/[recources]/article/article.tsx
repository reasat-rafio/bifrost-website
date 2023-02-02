import { ForwardedRef, RefObject, forwardRef } from "react";
import { PortableText } from "utils/sanity";
import { Serializers } from "./serializers";
import { useIntersection } from "lib/hooks";
import { useScroll } from "framer-motion";
import { ScrollDetective } from "components/common/scroll-detective";

interface ArticleProps {
  ref?: ForwardedRef<HTMLElement>;
  body: any;
}

export const Article: React.FC<ArticleProps> = forwardRef(({ body }, ref) => {
  const articleIntersecting = useIntersection(
    ref as RefObject<HTMLElement>
  )?.isIntersecting;

  const { scrollYProgress } = useScroll({
    target: ref as RefObject<HTMLElement>,
  });

  return (
    <>
      <ScrollDetective
        intersecting={articleIntersecting}
        scrollYProgress={scrollYProgress}
      />
      <article
        ref={ref as React.LegacyRef<HTMLDivElement>}
        className="prose h-full max-w-none px-6 pt-24"
      >
        <PortableText blocks={body} serializers={Serializers} />
      </article>
    </>
  );
});
