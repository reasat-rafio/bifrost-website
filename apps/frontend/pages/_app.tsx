import '../styles/globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/titillium-web'
import { imageUrlBuilder } from 'utils/sanity'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { AppProvider } from 'contexts/global'
import Navbar from 'components/Navbar'
import { motion } from 'framer-motion'
import Footer from 'components/Footer'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  let faviconImage: string | null = null

  const [seoTitle, setSeoTitle] = useState()
  const [seoDescription, setSeoDescription] = useState()
  const [ogImage, setOgImage] = useState()

  useEffect(() => {
    if (pageProps.data?.page._type === 'blog') {
      setSeoTitle(pageProps.data?.page.heading)
      setSeoDescription(pageProps.data?.page.subHeading)
      setOgImage(pageProps.data?.page.image)
    } else {
      setSeoTitle(pageProps.data?.page.seo.title)
      setSeoDescription(pageProps.data?.page.seo.description)
      setOgImage(pageProps.data?.page.seo.seoImage ?? pageProps.data?.site?.ogImage)
    }
  }, [])

  if (pageProps.data?.site.logos.favicon) {
    faviconImage = imageUrlBuilder
      .image(pageProps.data?.site?.logos.favicon)
      .size(256, 256)
      .ignoreImageParams()
      .url()
  }

  const openGraphImages = ogImage
    ? [
        { w: 800, h: 600 },
        { w: 1200, h: 630 },
        { w: 600, h: 600 },
        { w: 256, h: 256 },
      ].map(({ w, h }) => ({
        url: `${imageUrlBuilder.image(ogImage).width(w).height(h).url()}`,
        width: w,
        height: h,
        alt: `${seoTitle}`,
      }))
    : []

  return (
    <div>
      <Head>
        <link rel="icon" type="image/png" href={faviconImage} />
      </Head>
      <AppProvider>
        <div className="bg-black relative overflow-clip text-white">
          <NextSeo
            title={seoTitle}
            description={seoDescription}
            openGraph={{
              images: openGraphImages,
            }}
          />
          {pageProps.data?.site && (
            <Navbar
              darkLogo={pageProps.data?.site.logos.darkLogo}
              logo={pageProps.data?.site.logos.logo}
              menu={pageProps.data?.site.nav.menu}
              darkBg={pageProps.data?.page._type === 'blog'}
            />
          )}
          {pageProps.data?.page._type !== 'blog' && (
            <div className="absolute top-0 left-0 w-[100vw] h-[100vh]">
              <div className="bifrost__background_noise"></div>
            </div>
          )}

          <Component {...pageProps} />
          {pageProps.data?.site && (
            <Footer
              logo={pageProps.data?.site.logos.logo}
              footer={pageProps.data?.site.nav.footer}
            />
          )}
        </div>
      </AppProvider>
    </div>
  )
}

export default MyApp
