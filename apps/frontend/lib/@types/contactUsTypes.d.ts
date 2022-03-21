export type ContactUsPage = {
  sections: Section[]
  seo: SEO
}

export interface HomeSection {
  headline: string
  items: [{ body: any[]; name: string }]
}
