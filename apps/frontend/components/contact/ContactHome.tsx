import clsx from 'clsx'
import ThreeJSWaves from 'components/ThreeJSWaves'
import { HomeSection } from 'lib/contactUsTypes'
import { ReactElement } from 'react'
import { PortableText } from 'utils/sanity'

export default function ContactHome(data: HomeSection): ReactElement {
  console.log({ data })

  return (
    <div className="relative overflow-y-clip">
      <div className="absolute z-0 left-0 bottom-0 w-full h-full flex items-end">
        <div className="relative translate-y-[25vh]">
          <ThreeJSWaves />
        </div>
      </div>
      <div
        className={clsx(
          'container lg:pt-16 pt-24 grid grid-cols-12 md:flex-row z-10 md:space-y-8 space-y-8 relative w-[100vw] min-h-[100vh] overflow-y-clip lg:py-0 py-52',
          'text-white',
        )}
      >
        <div className="lg:col-span-5 xl:col-span-5 col-span-12 flex flex-col items-start md:flex-1 lg:space-y-10 self-center">
          <div>
            <h1 className="lg:text-head-2 text-[82px] leading-[82px] font-[375] bg-clip-text bifrost__gradient_green text-transparent">
              {data.headline}
            </h1>
          </div>
        </div>
        <div
          className="col-span-12 grid lg:grid-cols-12 grid-cols-4 lg:gap-x-8 lg:gap-y-0 gap-y-4 lg:h-[35%] w-full"
          style={{ gridAutoRows: '1fr' }}
        >
          {data.items.map((item) => (
            <div className="col-span-4 flex flex-col space-y-4" key={item.name}>
              <div className="text-head-5 font-[375]">{item.name}</div>
              <div className="h-full bifrost__transparent_card p-5 flex items-center backdrop-blur-3xl text-body-2">
                <PortableText blocks={item.body} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="z-10 absolute bottom-0 left-0 h-[30vh] w-full"
        style={{ background: 'linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)' }}
      ></div>
    </div>
  )
}
