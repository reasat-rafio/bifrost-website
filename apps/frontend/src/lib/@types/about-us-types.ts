import { SanityImage } from 'sanity-react-extra'
import { CTAButton, SEO } from './global-types'

export type AboutUsPage = {
  sections: any[]
  seo: SEO
}

export interface HomeProps {
  heading: string
  title: any[]
  subtitle: string
  ctaButton?: CTAButton
}

export interface AboutSectionProps {
  heading: string
  title: string
  description: string
  ctaButton?: CTAButton
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
  title: string
  subtitle: string
  members: [
    {
      name: string
      role: string
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
