import { WaveScene } from "components/common/wave-scene";
import { Button } from "components/ui/button";
import { Description } from "components/ui/description";
import { Heading } from "components/ui/heading";
import { Title } from "components/ui/title";
import { CTAButton } from "lib/@types/global-types";
import { useIntersection } from "lib/hooks";
import { useRef } from "react";

interface IntegrateProps {
  type: string;
  ctaButton: CTAButton;
  showWave: boolean;
  subtitle: string;
  title: string;
}

export const Integrate: React.FC<IntegrateProps> = ({
  ctaButton,
  title,
  subtitle,
  showWave,
}) => {
  const sectionRef = useRef(null);
  const intersecting =
    useIntersection(sectionRef, { threshold: 0.3 })?.isIntersecting ?? false;

  return (
    <section
      ref={sectionRef}
      className="section_pading relative  z-20 overflow-clip"
    >
      {!!showWave && <WaveScene play={intersecting} />}
      <div className="spacing_primary container relative z-20 mx-auto">
        <Title className="text-center">{title}</Title>
        <Heading variant="small" className="text-center">
          {subtitle}
        </Heading>
        <div className="!mt-8 text-center sm:!mt-12">
          <Button type="href" variant="secondary" href={ctaButton.href}>
            {ctaButton.title}
          </Button>
        </div>
      </div>

      {!!showWave && (
        <div
          className="pointer-events-none absolute bottom-0 left-0 z-10 h-[30vh] w-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)",
          }}
        />
      )}
    </section>
  );
};
