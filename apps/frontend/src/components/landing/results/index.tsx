import { Heading } from "components/ui/heading";
import { Title } from "components/ui/title";
import type { Result } from "lib/@types/landing-types";
import { PortableText } from "utils/sanity";
import { DownArrowIcon, UpArrowIcon } from "./graident-arrow-icons";
import { Description } from "components/ui/description";
import { Section } from "components/ui/section";
import { useEffect, useRef } from "react";
import { AnimationPlaybackControls, animate } from "framer-motion";
import { useIntersection } from "lib/hooks";

interface ResultsProps {
  type: string;
  heading: string;
  results: Result[];
  title: string;
}

const renderIndecatorIcon = (indicatorIcon: Result["indicatorIcon"]) => {
  switch (indicatorIcon) {
    case "increase":
      return <UpArrowIcon />;
    case "decrease":
      return <DownArrowIcon />;
    case "none":
      break;
    default:
      break;
  }
};
const Results: React.FC<ResultsProps> = ({ heading, results, title }) => {
  const sectionRef = useRef(null);
  const isIntersecting = useIntersection(sectionRef)?.isIntersecting ?? false;

  return (
    <Section ref={sectionRef}>
      <div className="spacing_primary | font-light lg:px-[4%]">
        <Title animate={{ show: isIntersecting, delay: 0.1 }}>{title}</Title>
        <Heading
          variant="small"
          animate={{ show: isIntersecting, delay: 0.15 }}
        >
          {heading}
        </Heading>

        <div className="| mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-10 lg:mt-20 lg:grid-cols-3 lg:gap-20">
          {results.map(
            ({ _key, description, indicatorIcon, isPercentage, number }) => (
              <div key={_key}>
                <div className="flex items-center space-x-4 bg-gradient-to-br from-[#70FCEB] via-[#9BB8FF] to-[#B794FF] bg-clip-text text-head-3 text-transparent sm:text-head-4 md:text-head-2 lg:text-head-1">
                  <div className="flex">
                    <Counter
                      animationStart={isIntersecting}
                      from={0}
                      to={number}
                    />
                    {!!isPercentage && <span>%</span>}
                  </div>
                  <span className="rounded-[31.5px] border-none bg-[#102134] py-[8px] px-[6px]">
                    {renderIndecatorIcon(indicatorIcon)}
                  </span>
                </div>

                <Description
                  type="div"
                  animate={{ show: isIntersecting, delay: 0.2 }}
                >
                  <PortableText
                    blocks={description}
                    serializers={{
                      marks: {
                        pop: ({ children }: any) => (
                          <span
                            style={{
                              WebkitBoxDecorationBreak: "clone",
                            }}
                            className="primary__gradient break-words bg-clip-text text-transparent"
                          >
                            {children}
                          </span>
                        ),
                      },
                    }}
                  />
                </Description>
              </div>
            )
          )}
        </div>
      </div>
    </Section>
  );
};

const Counter = ({
  from,
  to,
  animationStart,
}: {
  from: number;
  to: number;
  animationStart: boolean;
}) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    let controls: AnimationPlaybackControls;
    if (animationStart) {
      controls = animate(from, to, {
        duration: 2,
        type: "tween",
        ease: "anticipate",
        onUpdate(value) {
          node.textContent = value.toFixed(0);
        },
      });
    }

    return () => controls?.stop();
  }, [from, to, animationStart]);

  return <p ref={nodeRef} />;
};

export default Results;
