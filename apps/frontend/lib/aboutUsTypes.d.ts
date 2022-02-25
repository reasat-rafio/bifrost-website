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
