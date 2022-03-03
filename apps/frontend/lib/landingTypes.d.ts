export type LandingPage = {
  sections: Section[]
  seo: SEO
}

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

export interface ContactSection {
  headline: string
  ctaButton: CTAButton
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