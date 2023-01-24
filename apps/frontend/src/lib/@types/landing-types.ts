import { SanityImage } from 'sanity-react-extra'
import { CTAButton, SEO } from './global-types'

export type LandingPage = {
  sections: any[]
  seo: SEO
}

export interface HomeSection {
  title: any
  subtitle: string
  ctaButton?: CTAButton
  image: SanityImage
}

export interface ProductSection {
  title: string
  subtitle: string
  description: string
  ctaButton?: CTAButton
  images: [SanityImage]
}

export interface ProjectSection {
  title: string
  subtitle: string
  projects: [{ _key: string; image: SanityImage; name: string; url?: string }]
}

export interface ReviewSection {
  reviews: [{ _key: string; review: string; image: SanityImage; name: string; role: string }]
}

export interface DemoSection {
  title: string
  previews: [SanityImage]
}

export interface ContactSection {
  headline: string
  ctaButton: CTAButton
}

export interface DataSection {
  headline: any
  body: string
  ctaButton: CTAButton
}

export interface Service {
  headline: string
  subtitle?: string
  body: string
  ctaButton: CTAButton
  cardPosition: string
  image: SanityImage
  imagePosition: string
}

export interface ServiceSection {
  headline: string
  items: [Service]
}

export interface Partner {
  _key: string
  _type: string
  logo: SanityImage
  name?: string
  url?: string
}
