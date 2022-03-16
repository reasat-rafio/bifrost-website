export type BlogPage = {
  sections: Section[]
  seo: SEO
}

export interface HomeSection {
  headline: string
  subHeadline: string
}

export interface ArticlesSection {
  articles: [
    {
      _key: string
      headline: string
      subHeadline: string
      body: string
      ctaButton: CTAButton
      image: SanityImage & ImageAlt
    },
  ]
}
