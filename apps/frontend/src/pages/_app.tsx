import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "core-js/stable";
import "intersection-observer";

import dynamic from "next/dynamic";
import "@styles/global.scss";
import Footer from "components/footer/footer";
import Navbar from "components/nav/navbar";
import { NextSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";
import { imageUrlBuilder } from "utils/sanity";
import type { NavbarDropdownProps } from "components/nav/dropdown/dropdown";

const NavbarDropdown = dynamic<NavbarDropdownProps>(
  () => import("components/nav/dropdown/dropdown"),
  { ssr: false }
);
const MenuDropdown = dynamic<{}>(() => import("components/nav/menu-dropdown"), {
  ssr: false,
});
import { useRouter } from "next/router";
import { useEffect } from "react";
import useGlobalStore from "store/global.store";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { setShowNavDropDown } = useGlobalStore();
  const is404Page = router.pathname === "/_error";
  const ogImage =
    pageProps.data?.page.seo?.seoImage ?? pageProps.data?.site?.ogImage;
  let faviconImage = pageProps.data?.site.logos.favicon
    ? imageUrlBuilder
        .image(pageProps.data?.site?.logos.favicon)
        .size(256, 256)
        .ignoreImageParams()
        .url()
    : null;

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
        alt: `${pageProps.data?.page.seo?.title}`,
      }))
    : [];

  useEffect(() => {
    setShowNavDropDown(false);
  }, [router.pathname]);

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href={faviconImage} />
      </Head>

      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
      `}
      </Script>

      <div className="relative overflow-clip bg-black text-white">
        <NextSeo
          title={pageProps.data?.page.seo?.title}
          description={pageProps.data?.page.seo?.description}
          openGraph={{
            images: openGraphImages,
          }}
        />
        {!is404Page && router.pathname !== "/request-demo-standalone" && (
          <>
            <Navbar
              darkLogo={pageProps.data?.site.logos.darkLogo}
              logo={pageProps.data?.site.logos.logo}
              menu={pageProps.data?.site.nav.menu}
              darkBg={!!pageProps?.darkNavbar}
            />
            <MenuDropdown />
            <NavbarDropdown
              menu={pageProps.data?.site.nav.menu}
              darkBg={!!pageProps?.darkNavbar}
            />
          </>
        )}

        <Component {...pageProps} />
        {/* <Toast /> */}
        {!is404Page && router.pathname !== "/request-demo-standalone" && (
          <Footer
            logo={pageProps.data?.site.logos.logo}
            footer={pageProps.data?.site.nav.footer}
          />
        )}
      </div>
    </>
  );
}

export default MyApp;
