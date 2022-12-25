export type LandingPage = {
  sections: Section[]
  seo: SEO
}

export interface HomeSection {
  title: any
  subtitle: string
  ctaButton?: CTAButton
  image: SanityImage & ImageAlt
}

export interface ProductSection {
  title: string
  subtitle: string
  description: string
  ctaButton?: CTAButton
  images: [SanityImage & ImageAlt]
}

export interface ProjectSection {
  title: string
  subtitle: string
  projects: [{ _key: string; image: SanityImage & ImageAlt; name: string; url?: string }]
}

export interface ReviewSection {
  reviews: [
    { _key: string; review: string; image: SanityImage & ImageAlt; name: string; role: string },
  ]
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
  image: SanityImage & ImageAlt
  imagePosition: string
}

export interface ServiceSection {
  headline: string
  items: [Service]
}
