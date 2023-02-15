import dynamic from "next/dynamic";
import "@styles/global.scss";
import Footer from "components/footer/footer";
import Navbar from "components/nav/navbar";
import { NextSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";
import { imageUrlBuilder } from "utils/sanity";
import type { NavbarDropdownProps } from "components/nav/dropdown";
const NavbarDropdown = dynamic<NavbarDropdownProps>(
  () => import("components/nav/dropdown"),
  { ssr: false }
);
const MenuDropdown = dynamic<{}>(() => import("components/nav/menu-dropdown"), {
  ssr: false,
});
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
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

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href={faviconImage} />
      </Head>
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
