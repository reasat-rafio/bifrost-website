import { SanityImage } from 'sanity-react-extra'

interface HeroDataImage {
  type: 'image'
  image?: SanityImage & ImageAlt
}

interface HeroDataVideo {
  type: 'video'
  video: any
}

interface Youtube {
  url: string
}

interface HeroDataYoutube {
  type: 'youtube'
  youtube?: Youtube
}

type HeroData = HeroDataImage | HeroDataVideo | HeroDataYoutube

export interface HomeSection {
  body: string
  ctaButton: CTAButton
  headline: string
  subHeadline: string
  image: SanityImage & ImageAlt
}

export interface ProductSection {
  body: string
  ctaButton: CTAButton
  headline: string
  subHeadline: string
  images: [SanityImage & ImageAlt]
}

export interface ProjectSection {
  body: string
  ctaButton: CTAButton
  headline: string
  items: [{ image: SanityImage & ImageAlt; name: string; url: string }]
}

export interface ReviewSection {
  items: [{ body: string; image: SanityImage & ImageAlt; description: string; name: string }]
}

export interface DemoSection {
  headline: string
  previews: [SanityImage & ImageAlt]
}

export interface DataSection {
  headline: string
  body: string
  ctaButton: CTAButton
}
export interface Service {
  headline: string
  body: string
  ctaButton: CTAButton
  cardPosition: string
  image: SanityImage & ImageAlt
  imagePosition: string
}

export interface ServiceSection {
  headline: string
  items: [Service]
}

export interface Site {
  logos: { logo: SanityImage }
  nav: {
    menu: MenuItem[]
    footer: Footer
  }
}

export interface Footer {
  copyright: string
  menu: MenuItem[]
  socialButtons: Social[]
}

export interface MenuItem {
  href: string
  title: string
  isCTA: boolean
  submenu: array
}

type SocialType = 'facebook' | 'twitter' | 'linkedin' | 'instagram'
export interface Social {
  title: string
  type: SocialType
  url: string
}

export type Section = HomeSection

export type LandingPage = {
  sections: Section[]
  seo: SEO
}

export interface SEO {
  title: string
  description: string
  ogImage: SanityImage
}
