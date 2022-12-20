export type UseCasePage = {
  sections: Section[]
  seo: SEO
}

export interface HomeSection {
  headline: string
  subHeadline: string
  body: string
  ctaButton: CTAButton
}

export interface ImagesSection {
  headline: string
  subHeadline: string
  examples: [
    {
      _key: string
      title: string
      body: string
      image: SanityImage & ImageAlt
    },
  ]
}

export interface FeaturesSection {
  headline: string
  subHeadline: string
  body: string
  ctaButton: CTAButton
  features: [
    {
      title: string
      image: SanityImage & ImageAlt
    },
  ]
}

export interface AssuranceSection {
  headline: string
  subHeadline: string
  body: string
  ctaButton: CTAButton
  image: SanityImage & ImageAlt
}

export interface Enterprise {
  body: string
  headline: string
  subtitle: string
  ctaButton: CTAButton
  image: SanityImage & ImageAlt
  cardPosition: string
  imagePosition: string
}

export interface EnterpriseSection {
  headline: string
  subHeadline: string
  enterprises: [Enterprise]
}
