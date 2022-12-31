import { SanityImage } from 'sanity-react-extra'
import { CTAButton, SEO } from './global-types'

export type AboutUsPage = {
  sections: any[]
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
  image: SanityImage
}

export interface ClientsSection {
  headline: string
  subHeadline: string
  clients: [
    {
      _key: string
      name: string
      logo: SanityImage
    },
  ]
}

export interface TeamSection {
  headline: string
  subHeadline: string
  members: [
    {
      name: string
      position: string
      image: SanityImage
    },
  ]
}

export interface ReasonSection {
  headline: string
  subHeadline: string
  reasons: [
    {
      title: string
      headline: string
      body: string
      image: SanityImage
    },
  ]
}
