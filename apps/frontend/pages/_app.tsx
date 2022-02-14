import '../styles/globals.css'
import { imageUrlBuilder } from 'utils/sanity'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { AppProvider } from 'contexts/global'

function MyApp({ Component, pageProps }: AppProps) {
  let faviconImage: string | null = null
  const ogImage = pageProps.data?.page.seo.seoImage ?? pageProps.data?.site.ogImage
  if (pageProps.data?.site.logos.favicon) {
    faviconImage = imageUrlBuilder
      .image(pageProps.data?.site.logos.favicon)
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
        alt: `${pageProps.data?.page.seo.title}`,
      }))
    : []

  return (
    <div>
      <Head>
        <link rel="icon" type="image/png" href={faviconImage} />
      </Head>
      <AppProvider>
        <div>
          <NextSeo
            title={pageProps.data?.page.seo.title}
            description={pageProps.data?.page.seo.description}
            openGraph={{
              images: openGraphImages,
            }}
          />
          <Component {...pageProps} />
        </div>
      </AppProvider>
    </div>
  )
}

export default MyApp
