import { ReactElement } from "react";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { Footer as FooterType, NewsletterProps } from "lib/@types/global-types";
import { imageUrlBuilder } from "utils/sanity";
import Link from "next/link";
import { useWindowSize } from "lib/hooks";
import { Button } from "./ui/button";
import clsx from "clsx";
import { Description } from "./ui/description";

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
      <div className="container relative z-10 grid grid-cols-12 gap-y-5 py-14 text-white sm:py-16 md:gap-x-10 lg:py-24 xl:gap-y-0 xl:py-36">
        <section className="col-span-12 flex flex-col gap-y-3 md:gap-y-7 xl:col-span-4">
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
                <a className="rounded-full bg-primary p-3">
                  <SanityImg
                    className="h-[13px] w-[13px] object-contain sm:h-[15px] sm:w-[15px]"
                    builder={imageUrlBuilder}
                    image={item.icon}
                    width={windowWidth >= 768 ? 24 : 20}
                    alt={item.url}
                  />
                </a>
              </Link>
            ))}
          </div>
          <span className="| hidden text-lg opacity-70 xl:block">
            {copyright}
          </span>
        </section>
        <hr className="col-span-12 md:hidden" />
        <section className="col-span-12 flex flex-col gap-y-3 md:col-span-6 md:gap-y-7 xl:col-span-4">
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
        <Newsletter
          className="col-span-12 flex flex-col gap-y-7 md:col-span-6 xl:col-span-4"
          {...newsletter}
        />
        <span className="col-span-12 xl:hidden">{copyright}</span>
      </div>
    </footer>
  );
}

interface INewsletter extends NewsletterProps {
  className?: string;
}
const Newsletter: React.FC<INewsletter> = ({
  className,
  title,
  ctaButton,
  subtitle,
}) => {
  return (
    <section className={clsx(className)}>
      <h6 className="text-[20px] font-semibold">{title}</h6>
      <p className="text-p-3-mobile opacity-70">{subtitle}</p>

      <div className="justify-self flex items-center">
        <div className="relative flex w-full">
          <input
            autoComplete="off"
            className="text-gray-700 focus:shadow-outline w-full appearance-none rounded-primary border border-[#8E8E8E]/30 bg-transparent py-4 px-5 text-body-3 leading-tight shadow focus:outline-none md:py-6 "
            id="username"
            type="email"
            placeholder="Enter your email address"
          />

          <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2 font-semibold">
            <Button
              variant="secondary"
              color="pink"
              type="href"
              href={ctaButton?.href ?? ""}
            >
              {ctaButton.title}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
