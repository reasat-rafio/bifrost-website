import { SanityImage } from 'sanity-react-extra'
import { CTAButton, SEO } from './global-types'

export type UseCasePage = {
  sections: any[]
  seo: SEO
}

export interface HomeSection {
  heading: string
  title: any[]
  subtitle: string
  ctaButton?: CTAButton
}

export interface ExamplesProps {
  title: string
  description: string
  examples: ExampleProps[]
}

export interface ExampleProps {
  _key: string
  title: string
  description: string
  image: SanityImage
}

export interface FeaturesSection {
  headline: string
  subHeadline: string
  body: string
  ctaButton: CTAButton
  features: [
    {
      title: string
      image: SanityImage
    },
  ]
}

export interface AssuranceSection {
  headline: string
  subHeadline: string
  body: string
  ctaButton: CTAButton
  image: SanityImage
}

export interface Enterprise {
  body: string
  headline: string
  subtitle: string
  ctaButton: CTAButton
  image: SanityImage
  cardPosition: string
  imagePosition: string
}

export interface EnterpriseSection {
  headline: string
  subHeadline: string
  enterprises: [Enterprise]
}
