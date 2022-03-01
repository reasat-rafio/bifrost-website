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

export interface ClientsSection {
  headline: string
  subHeadline: string
  clients: [
    {
      name: string
      logo: SanityImage & ImageAlt
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
      image: SanityImage & ImageAlt
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
      image: SanityImage & ImageAlt
    },
  ]
}
