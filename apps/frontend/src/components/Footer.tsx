import { ReactElement } from "react";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { Footer as FooterType } from "lib/@types/global-types";
import { imageUrlBuilder } from "utils/sanity";
import Link from "next/link";
import { useWindowSize } from "lib/hooks";
import { Button } from "./ui/button";

interface FooterProps {
  logo: SanityImage;
  footer: FooterType;
}

export default function Footer({
  logo,
  footer: { copyright, menu, socialButtons, newsletter },
}: FooterProps): ReactElement {
  const windowWidth = useWindowSize()?.width ?? 0;
  return (
    <footer className="relative z-10 bg-black">
      <div className="| | | container relative z-10 grid grid-cols-12 gap-y-5 py-10 text-white md:gap-x-10 xl:gap-y-0">
        <section className="| col-span-12 flex flex-col gap-y-3 md:gap-y-9 xl:col-span-4">
          <Link href="/">
            <a>
              <SanityImg
                className="h-12 w-auto transition-all"
                builder={imageUrlBuilder}
                image={logo}
                width={windowWidth >= 768 ? 180 : 90}
                alt="Bifrost Logo"
              />
            </a>
          </Link>
          <div className="flex gap-x-5">
            {socialButtons?.map((item) => (
              <Link key={item._id} href={item.url}>
                <a className="primary__gradient rounded-full p-[1px]">
                  <figure className="overflow-hidden rounded-full bg-black p-3 text-white">
                    <SanityImg
                      className="h-[13px] w-[13px] sm:h-[15px] sm:w-[15px]"
                      builder={imageUrlBuilder}
                      image={item.icon}
                      width={windowWidth >= 768 ? 24 : 20}
                      alt={item.url}
                    />
                  </figure>
                </a>
              </Link>
            ))}
          </div>
          <span className="| hidden text-lg opacity-70 xl:block">
            {copyright}
          </span>
        </section>
        <hr className="col-span-12 md:hidden" />
        <section className="col-span-12 flex flex-col gap-y-3 md:col-span-6 md:gap-y-9 xl:col-span-4">
          <h6 className="text-[20px] font-semibold">Quick Links</h6>
          <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-y-5">
            {menu?.map((menu) => (
              <Link key={menu._key} href={menu.pageUrl || menu.externalUrl}>
                <a className="| text-lg opacity-70 transition-opacity hover:opacity-100">
                  {menu.title}
                </a>
              </Link>
            ))}
          </div>
        </section>
        <hr className="col-span-12 md:hidden" />
        <section className="col-span-12 flex flex-col gap-y-9 md:col-span-6 xl:col-span-4">
          <h6 className="text-[20px] font-semibold">{newsletter.title}</h6>
          <p className="text-lg opacity-70">{newsletter.subtitle}</p>
          <div className="justify-self flex items-center">
            <div className="relative flex w-full">
              <input
                autoComplete="off"
                className="| | text-gray-700 | | focus:shadow-outline | input__dark w-full appearance-none rounded-primary py-4 px-5 text-body-3 leading-tight shadow focus:outline-none md:py-6 "
                id="username"
                type="email"
                placeholder="Enter your email address"
              />

              <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
                <Button
                  variant="primary"
                  type="href"
                  href={newsletter.ctaButton?.href ?? ""}
                >
                  {newsletter.ctaButton.title}
                </Button>
              </div>
            </div>
          </div>
        </section>
        <span className="col-span-12 xl:hidden">{copyright}</span>
      </div>
    </footer>
  );
}
