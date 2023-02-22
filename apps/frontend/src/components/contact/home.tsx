import { BackgroundNoise } from "components/ui/background-noise";
import { HomeSection } from "lib/@types/contact-us-types";
import { ReactElement } from "react";
import { PortableText } from "utils/sanity";
import { WaveScene } from "components/common/wave-scene";

export default function Home({
  contactInfos,
  headline,
}: HomeSection): ReactElement {
  return (
    <section className="w-full !overflow-hidden">
      <BackgroundNoise />
      <WaveScene />

      <div className="container flex min-h-screen !overflow-hidden py-[30%] lg:py-[5%]">
        <div className="z-10 m-auto grid w-full grid-cols-12 items-center justify-center gap-y-20">
          <section className="col-span-12">
            <h1 className="primary__gradient break-words bg-clip-text text-head-4 font-[375] leading-none text-transparent lg:text-head-2">
              <PortableText
                blocks={headline}
                serializers={{
                  marks: {
                    pop: ({ children }: any) => (
                      <span
                        style={{
                          WebkitBoxDecorationBreak: "clone",
                        }}
                        className="primary__gradient bg-clip-text text-transparent"
                      >
                        {children}
                      </span>
                    ),
                  },
                }}
              />
            </h1>
          </section>
          <section className="col-span-12 grid grid-cols-1 gap-10 lg:grid-cols-3">
            {contactInfos.map((item) => (
              <div className="flex flex-col space-y-4" key={item._key}>
                <h6 className="text-head-5 font-[375]">{item.title}</h6>
                <div className="bifrost__transparent_card flex h-full items-center p-5 text-body-2 backdrop-blur-3xl">
                  <PortableText blocks={item.description} />
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[30vh] w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)",
        }}
      ></div>
    </section>
  );
}
