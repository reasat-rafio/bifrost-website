import { SanityImage } from "sanity-react-extra";
import { CTAButton, SEO } from "./global-types";
import { SanityAsset } from "@sanity/image-url/lib/types/types";

export type LandingPage = {
  sections: any[];
  seo: SEO;
};

export interface HomeSection {
  title: any;
  subtitle: string;
  ctaButton?: CTAButton;
  image: SanityImage;
}

export interface ProductSection {
  title: string;
  subtitle: string;
  description: string;
  ctaButton?: CTAButton;
  images: [SanityImage];
}

export interface ProjectSection {
  title: string;
  subtitle: string;
  projects: [{ _key: string; image: SanityImage; name: string; url?: string }];
}

export interface ReviewSection {
  reviews: [
    {
      _key: string;
      review: string;
      image: SanityImage;
      name: string;
      role: string;
    }
  ];
}

export interface DemoSection {
  title: string;
  previews: [SanityImage];
}

export interface ContactSection {
  headline: string;
  ctaButton: CTAButton;
}

export interface DataSection {
  headline: any;
  body: string;
  ctaButton: CTAButton;
}

export interface Service {
  headline: string;
  subtitle?: string;
  body: string;
  ctaButton: CTAButton;
  cardPosition: string;
  image: SanityImage;
  imagePosition: string;
}

export interface ServiceSection {
  headline: string;
  items: [Service];
}

export interface Partner {
  _key: string;
  _type: string;
  logo: SanityImage;
  name?: string;
  url?: string;
}

export interface Collection {
  _key: string;
  _type: string;
  description: string;
  image: SanityImage;
  title: string;
}

export interface AboutCollection {
  _key: string;
  _type: string;
  description: any;
  heading: string;
  image: SanityImage;
  title?: string;
}

export interface Result {
  _key: string;
  _type: string;
  description: any;
  indicatorIcon: "increase" | "decrease" | "none";
  isPercentage: boolean;
  number: number;
}

export interface AssetElement {
  _key: string;
  _type: string;
  alt?: string;
  asset?: SanityImage;
  mp4?: string;
  video_mp4?: Video;
  video_webm?: Video;
  webm?: string;
  url?: string;
  thumbnail?: SanityAsset;
}

export interface Video {
  _type: string;
  asset: VideoMp4Asset;
}

export interface VideoMp4Asset {
  _ref: string;
  _type: string;
}

export interface IUseCase {
  _key: string;
  _type: string;
  image: SanityImage;
  name: string;
  url?: string;
}

export interface ITestimonial {
  _key: string;
  _type: string;
  image: SanityImage;
  name: string;
  testimony: string;
  role: string;
}
