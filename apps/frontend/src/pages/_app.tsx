import '@fontsource/roboto/300.css'
import '@fontsource/titillium-web'
import { imageUrlBuilder } from 'src/utils/sanity'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { AppProvider } from 'src/store/global'
import Navbar from 'components/nav/navbar'
import Footer from 'src/components/Footer'
import { useEffect, useState } from 'react'
// import { ToastContaiern as Toast } from 'src/components/ui/Toast'
import '@styles/global.scss'
import { Dropdown } from 'components/nav/dropdown'

function MyApp({ Component, pageProps }: AppProps) {
  let faviconImage: string | null = null
  const [seoTitle, setSeoTitle] = useState()
  const [seoDescription, setSeoDescription] = useState()
  const [ogImage, setOgImage] = useState()

  useEffect(() => {
    setSeoTitle(pageProps.data?.page.seo?.title)
    setSeoDescription(pageProps.data?.page.seo?.description)
    setOgImage(pageProps.data?.page.seo?.seoImage ?? pageProps.data?.site?.ogImage)
    if (pageProps.data?.site.logos.favicon) {
      faviconImage = imageUrlBuilder
        .image(pageProps.data?.site?.logos.favicon)
        .size(256, 256)
        .ignoreImageParams()
        .url()
    }
  }, [])

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
          <Navbar
            darkLogo={pageProps.data?.site.logos.darkLogo}
            logo={pageProps.data?.site.logos.logo}
            menu={pageProps.data?.site.nav.menu}
            darkBg={!!pageProps?.darkNavbar}
          />
          <Dropdown menu={pageProps.data?.site.nav.menu} darkBg={!!pageProps?.darkNavbar} />

          {/* {pageProps.data?.page._type !== 'blog' && (
            <div className="absolute top-0 left-0 w-[100vw] h-[100vh]">
              <div className="__background__noise__" />
            </div>
          )} */}

          <Component {...pageProps} />
          {/* <Toast /> */}
          <Footer logo={pageProps.data?.site.logos.logo} footer={pageProps.data?.site.nav.footer} />
          {/* {pageProps.data?.site && (
           
          )} */}
        </div>
      </AppProvider>
    </div>
  )
}

export default MyApp
