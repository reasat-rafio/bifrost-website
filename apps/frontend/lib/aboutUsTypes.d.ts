export type AboutUsPage = {
  sections: Section[]
  seo: SEO
}

export interface HomeSection {
  headline: string
  subHeadline: string
  body: string
  ctaButton: CTAButton
}

export interface AboutSection {
  headline: string
  subHeadline: string
  body: string
  ctaButton: CTAButton
  image: SanityImage & ImageAlt
}
