import { sanityStaticProps, useSanityQuery } from 'utils/sanity'
import Navbar from 'components/Navbar'
import { siteQuery } from 'lib/query'
import type { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { useMap } from 'react-use'
import { Section } from 'components/ui/Section'
import { useCtx } from 'contexts/global'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { renderObjectArray } from 'sanity-react-extra'
import { LandingPage, ServiceSection, Site } from 'lib/types'
import HomeHero from 'components/home/HomeHero'
import ThreeJSWaves from 'components/ThreeJSWaves'
import HomeProduct from 'components/home/HomeProduct'
import HomeDemo from 'components/home/HomeDemo'
import HomeService from 'components/home/HomeService'
import { useRef } from 'react'
import HomeData from 'components/home/HomeData'
import HomeProjects from 'components/home/HomeProjects'
import Ellipse from 'components/Ellipse'
import HomeReview from 'components/home/HomeReview'
import HomeContact from 'components/home/HomeContact'
import Footer from 'components/Footer'

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

export default function Home(props: SanityProps<{ site: Site; page: LandingPage }>) {
  const {
    data: {
      site,
      page: { sections },
    },
  } = useSanityQuery(query, props)

  const mainRef = useRef(null)

  const [activeSection, { set: setActive }] = useMap<{
    home?: boolean
    datasets?: boolean
    demo?: boolean
  }>({})

  const { isWhite } = useCtx()

  // useEffect(() => {
  //   console.log({ activeSection })
  //   if (activeSection.demo) {
  //     mainRef.current.classList.remove('overflow-scroll')
  //   }
  //   // else {
  //   //   if (!mainRef.current.classList.contains('overflow-scroll')) {
  //   //     mainRef.current.classList.add('overflow-scroll')
  //   //   }
  //   // }
  // }, [activeSection])

  return (
    <motion.div
      animate={{
        color: isWhite ? '#000' : '#fff',
        backgroundColor: isWhite ? '#fff' : '#000',
        transition: { ease: 'easeInOut', duration: 0.3 },
      }}
      className="relative "
      ref={mainRef}
    >
      <div className={clsx(!isWhite ? 'bifrost__background_noise' : 'opacity-0')}></div>
      <Navbar
        darkLogo={site.logos.darkLogo}
        logo={site.logos.logo}
        menu={site.nav.menu}
        activeSection={activeSection}
      />
      <Section name="hero" className="h-[100vh] snap-center" setActive={setActive} isWhite={false}>
        {renderObjectArray(sections, {
          home: HomeHero,
        })}
      </Section>
      <hr style={{ color: '#1E2531', height: '2px' }} />

      <div className="absolute left-0 top-0 w-full h-[100vh] overflow-clip">
        <div className="relative translate-y-[15vh]">
          <ThreeJSWaves />
        </div>
      </div>

      <Section
        name="products"
        setActive={setActive}
        className="h-[100vh] snap-start"
        isWhite={false}
      >
        {renderObjectArray(sections, {
          products: HomeProduct,
        })}
      </Section>
      <hr style={{ color: '#1E2531', height: '2px' }} />
      <Section name="demo" setActive={setActive} threshold={0.2} className="snap-start">
        {renderObjectArray(sections, {
          demo: HomeDemo,
        })}
      </Section>
      <hr style={{ color: '#1E2531', height: '2px' }} className="translate-y-[-3rem]" />
      <Section name="tech" threshold={0.2} isWhite={true} className="h-[100vh] snap-start">
        {renderObjectArray(sections, {
          services: (data: ServiceSection) => (
            <div
              className={clsx(
                'container flex justify-center items-center z-10 relative h-[100vh]',
                isWhite ? 'text-black' : 'text-white',
              )}
            >
              <div className="text-center text-[80px] leading-[96px] font-[275]">
                {data.headline}
              </div>
            </div>
          ),
        })}
      </Section>
      <hr style={{ color: '#1E2531', height: '2px' }} />
      <Ellipse className="z-10 absolute top-[140vh] right-[5vw] w-[153px] h-[391px]" />
      <Ellipse className="z-10 absolute top-[340vh] right-[5vw] w-[153px] h-[391px]" />
      <Section
        name="service"
        setActive={setActive}
        threshold={0}
        isWhite={false}
        className="relative"
      >
        {renderObjectArray(sections, {
          services: HomeService,
        })}
      </Section>
      <hr style={{ color: '#1E2531', height: '2px' }} />
      <Ellipse className="z-10 absolute top-[40vh] right-[5vw] w-[153px] h-[391px]" />
      <Section name="data" setActive={setActive} isWhite={false} className="snap-start">
        {renderObjectArray(sections, {
          data: HomeData,
        })}
      </Section>
      <hr style={{ color: '#1E2531', height: '2px' }} />
      <Section name="projects" setActive={setActive} isWhite={false} className="snap-start">
        {renderObjectArray(sections, {
          projects: HomeProjects,
        })}
      </Section>
      <hr style={{ color: '#1E2531', height: '2px' }} />
      <Ellipse className="z-20 absolute top-[50vh] right-[15vw] w-[153px] h-[391px]" />
      <Section
        name="reviews"
        setActive={setActive}
        isWhite={false}
        className="snap-start"
        threshold={0}
      >
        {renderObjectArray(sections, {
          reviews: HomeReview,
        })}
      </Section>
      <hr style={{ color: '#1E2531', height: '2px' }} />
      <Section name="contact" setActive={setActive} isWhite={true} threshold={0.4}>
        {renderObjectArray(sections, {
          contact: HomeContact,
        })}
      </Section>
      <hr style={{ color: '#1E2531', height: '2px' }} />
      <Footer logo={site.logos.logo} footer={site.nav.footer} />
    </motion.div>
  )
}
