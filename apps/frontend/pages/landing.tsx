import { ReactElement } from 'react'
// import ReactFullpage from '@fullpage/react-fullpage'
import { siteQuery } from 'lib/query'
import { groq } from 'next-sanity'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { sanityStaticProps, useSanityQuery } from 'utils/sanity'
// import { Site } from 'lib/types'
import { SanityProps } from 'next-sanity-extra'
// import { Section } from 'components/ui/Section'
// import { renderObjectArray } from 'sanity-react-extra'
// import HomeHero from 'components/home/HomeHero'
// import { useMap } from 'react-use'
// import clsx from 'clsx'
// import ThreeJSWaves from 'components/ThreeJSWaves'
// import HomeProduct from 'components/home/HomeProduct'
// import HomeActions from 'components/home/HomeActions'
// import { DemoSection, LandingPage } from 'lib/landingTypes'

// const pluginWrapper = () => {
//   require('lib/scrolloverflow.min.js')
// }

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "landingPage"][0] {
    ...,
    sections[] {
      ...,
      previews[] {
        ...
        asset->{
          ...,
          metadata {
            dimensions
          }
        }
      },
    },
  },
}`

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
})

export default function Landing(props: SanityProps): ReactElement {
  const {
    data: {
      // page: { sections },
    },
  } = useSanityQuery(query, props)

  // const [_, { set: setActive }] = useMap<{
  //   home?: boolean
  //   datasets?: boolean
  //   demo?: boolean
  // }>({})

  // const { isWhite } = useCtx()

  return (
    <div className="relative bg-black color-white">
      <div className="bifrost__background_noise"></div>
      {/* <ReactFullpage
        pluginWrapper={pluginWrapper}
        //fullpage options
        licenseKey={process.env.FULL_PAGE_KEY}
        scrollingSpeed={1000}
        scrollOverflow={true}
        scrollHorizontallyKey={'YOUR KEY HERE'}
        render={({}) => {
          return (
            <ReactFullpage.Wrapper>
              <div className="section">
                <Section
                  name="hero"
                  className="h-[100vh] section"
                  setActive={setActive}
                  isWhite={false}
                >
                  {renderObjectArray(sections, {
                    home: HomeHero,
                  })}
                </Section>
                <div className="absolute left-0 top-0 w-full h-[100vh] overflow-clip">
                  <div className="relative translate-y-[15vh]">
                    <ThreeJSWaves />
                  </div>
                </div>
              </div>
              <div className="section">
                <Section
                  name="products"
                  setActive={setActive}
                  className="h-[100vh]"
                  isWhite={false}
                >
                  {renderObjectArray(sections, {
                    products: HomeProduct,
                  })}
                </Section>
              </div>
              <div className="section">
                <Section name="tech" threshold={0.2} isWhite={true} className="h-[100vh]">
                  {renderObjectArray(sections, {
                    demo: (data: DemoSection) => (
                      <div
                        className={clsx(
                          'container flex justify-center items-center z-10 relative h-[100vh]',
                          'text-white',
                        )}
                      >
                        <div className="text-center text-[80px] leading-[96px] font-[275]">
                          {data.headline}
                        </div>
                      </div>
                    ),
                  })}
                </Section>
              </div>
              <div className="section">
                <Section name="demo" setActive={setActive} threshold={0.2}>
                  {renderObjectArray(sections, {
                    demo: HomeActions,
                  })}
                </Section>
              </div>
            </ReactFullpage.Wrapper>
          )
        }}
      /> */}
    </div>
  )
}
