import { SEO } from './global-types'

export type ContactUsPage = {
  sections: any[]
  seo: SEO
}

export interface HomeSection {
  headline: string
  contactInfos: [{ title: string; description: any[] }]
}
