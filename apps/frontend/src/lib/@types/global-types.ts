import { SanityImage } from "sanity-react-extra";

export interface Footer {
  copyright: string;
  socialButtons: Social[];
  menu: MenuItem[];
  newsletter: NewsletterProps;
}
export interface NewsletterProps {
  title: string;
  subtitle: string;
  ctaButton: CTAButton;
}

export interface Site {
  logos: { logo: SanityImage; darkLogo: SanityImage };
  nav: {
    menu: MenuItem[];
    footer: Footer;
  };
}

export interface Footer {
  copyright: string;
  menu: MenuItem[];
  socialButtons: Social[];
}

export interface MenuItem {
  _key: string;
  title: string;
  pageUrl: string;
  externalUrl: string;
  highlight: boolean;
  dropdownList?: DropdownListProps[];
}

export interface DropdownListProps {
  _key: string;
  image: SanityImage;
  title: string;
  description: string;
  url: string;
}

export interface Social {
  _id: string;
  icon: SanityImage;
  url: string;
}

export interface SEO {
  title: string;
  description: string;
  ogImage: SanityImage;
}

export interface CTAButton {
  title: string;
  href: string;
}

export interface IToast {
  id: string;
  content: string;
  type: "error" | "success";
}

export interface YoutubeProps {
  _key?: string;
  _type?: string;
  url: string;
}
