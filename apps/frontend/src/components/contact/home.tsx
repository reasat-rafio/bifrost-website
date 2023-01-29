import { BackgroundNoise } from 'components/ui/background-noise'
import { HomeSection } from 'lib/@types/contact-us-types'
import { ReactElement } from 'react'
import { PortableText } from 'utils/sanity'
import { WaveScene } from 'components/common/wave-scene'

export default function Home({ contactInfos, headline }: HomeSection): ReactElement {
  return (
    <section className="w-full !overflow-hidden">
      <BackgroundNoise />
      <WaveScene />

      <div className="container min-h-screen flex lg:py-[5%] py-[30%] !overflow-hidden">
        <div className="grid grid-cols-12 justify-center items-center w-full m-auto gap-y-20 z-10">
          <section className="col-span-12">
            <h1 className="lg:text-head-2 text-head-4 leading-none font-[375] bg-clip-text primary__gradient text-transparent">
              <PortableText
                blocks={headline}
                serializers={{
                  marks: {
                    pop: ({ children }: any) => (
                      <span className="text-transparent bg-clip-text primary__gradient">
                        {children}
                      </span>
                    ),
                  },
                }}
              />
            </h1>
          </section>
          <section className="col-span-12 grid lg:grid-cols-3 grid-cols-1 gap-10">
            {contactInfos.map((item) => (
              <div className="flex flex-col space-y-4" key={item._key}>
                <h6 className="text-head-5 font-[375]">{item.title}</h6>
                <div className="h-full bifrost__transparent_card p-5 flex items-center backdrop-blur-3xl text-body-2">
                  <PortableText blocks={item.description} />
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
      <div
        className="absolute pointer-events-none bottom-0 left-0 h-[30vh] w-full"
        style={{ background: 'linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)' }}
      ></div>
    </section>
  )
}
